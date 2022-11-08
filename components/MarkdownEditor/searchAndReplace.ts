import { Command, EditorView } from '@codemirror/view'
import { SearchCursor } from '@codemirror/search'
import {
  CharCategory,
  combineConfig,
  EditorState,
  Facet,
  findClusterBreak,
  StateEffect,
  StateField,
  Text,
} from '@codemirror/state'

type SearchResult = typeof SearchCursor.prototype.value
interface SearchConfig {
  /// Whether to position the search panel at the top of the editor
  /// (the default is at the bottom).
  top?: boolean

  /// Whether to enable case sensitivity by default when the search
  /// panel is activated (defaults to false).
  caseSensitive?: boolean

  /// Whether to treat string searches literally by default (defaults to false).
  literal?: boolean

  /// Controls whether the default query has by-word matching enabled.
  /// Defaults to false.
  wholeWord?: boolean
}
const baseFlags = 'gm' + (/x/.unicode == null ? '' : 'u')
function validRegExp(source: string) {
  try {
    new RegExp(source, baseFlags)
    return true
  } catch {
    return false
  }
}

class SearchQuery {
  /// The search string (or regular expression).
  readonly search: string
  /// Indicates whether the search is case-sensitive.
  readonly caseSensitive: boolean
  /// By default, string search will replace `\n`, `\r`, and `\t` in
  /// the query with newline, return, and tab characters. When this
  /// is set to true, that behavior is disabled.
  readonly literal: boolean
  /// When true, the search string is interpreted as a regular
  /// expression.
  readonly regexp: boolean
  /// The replace text, or the empty string if no replace text has
  /// been given.
  readonly replace: string
  /// Whether this query is non-empty and, in case of a regular
  /// expression search, syntactically valid.
  readonly valid: boolean
  /// When true, matches that contain words are ignored when there are
  /// further word characters around them.
  readonly wholeWord: boolean

  /// @internal
  readonly unquoted: string

  /// Create a query object.
  constructor(config: {
    /// The search string.
    search: string
    /// Controls whether the search should be case-sensitive.
    caseSensitive?: boolean
    /// By default, string search will replace `\n`, `\r`, and `\t` in
    /// the query with newline, return, and tab characters. When this
    /// is set to true, that behavior is disabled.
    literal?: boolean
    /// When true, interpret the search string as a regular expression.
    regexp?: boolean
    /// The replace text.
    replace?: string
    /// Enable whole-word matching.
    wholeWord?: boolean
  }) {
    this.search = config.search
    this.caseSensitive = !!config.caseSensitive
    this.literal = !!config.literal
    this.regexp = !!config.regexp
    this.replace = config.replace || ''
    this.valid = !!this.search && (!this.regexp || validRegExp(this.search))
    this.unquoted = this.unquote(this.search)
    this.wholeWord = !!config.wholeWord
  }

  /// @internal
  unquote(text: string) {
    return this.literal
      ? text
      : text.replace(/\\([nrt\\])/g, (_, ch) =>
          ch == 'n' ? '\n' : ch == 'r' ? '\r' : ch == 't' ? '\t' : '\\'
        )
  }

  /// Compare this query to another query.
  eq(other: SearchQuery) {
    return (
      this.search == other.search &&
      this.replace == other.replace &&
      this.caseSensitive == other.caseSensitive &&
      this.regexp == other.regexp &&
      this.wholeWord == other.wholeWord
    )
  }

  /// @internal
  create(): StringQuery {
    return new StringQuery(this)
  }

  /// Get a search cursor for this query, searching through the given
  /// range in the given state.
  getCursor(
    state: EditorState | Text,
    from: number = 0,
    to?: number
  ): Iterator<{ from: number; to: number }> {
    let st = (state as any).doc
      ? (state as EditorState)
      : EditorState.create({ doc: state as Text })
    if (to == null) to = st.doc.length
    return stringCursor(this, st, from, to)
  }
}

class StringQuery {
  constructor(readonly spec: SearchQuery) {}

  getReplacement(_result: SearchResult) {
    return this.spec.unquote(this.spec.replace)
  }

  matchAll(state: EditorState, limit: number) {
    let cursor = stringCursor(this.spec, state, 0, state.doc.length),
      ranges = []
    while (!cursor.next().done) {
      if (ranges.length >= limit) return null
      ranges.push(cursor.value)
    }
    return ranges
  }
}

function stringCursor(spec: SearchQuery, state: EditorState, from: number, to: number) {
  return new SearchCursor(
    state.doc,
    spec.unquoted,
    from,
    to,
    spec.caseSensitive ? undefined : (x) => x.toLowerCase(),
    spec.wholeWord
      ? stringWordTest(state.doc, state.charCategorizer(state.selection.main.head))
      : undefined
  )
}
function stringWordTest(doc: Text, categorizer: (ch: string) => CharCategory) {
  return (from: number, to: number, buf: string, bufPos: number) => {
    if (bufPos > from || bufPos + buf.length < to) {
      bufPos = Math.max(0, from - 2)
      buf = doc.sliceString(bufPos, Math.min(doc.length, to + 2))
    }
    return (
      (categorizer(charBefore(buf, from - bufPos)) != CharCategory.Word ||
        categorizer(charAfter(buf, from - bufPos)) != CharCategory.Word) &&
      (categorizer(charAfter(buf, to - bufPos)) != CharCategory.Word ||
        categorizer(charBefore(buf, to - bufPos)) != CharCategory.Word)
    )
  }
}
function charBefore(str: string, index: number) {
  return str.slice(findClusterBreak(str, index, false), index)
}
function charAfter(str: string, index: number) {
  return str.slice(index, findClusterBreak(str, index))
}
function defaultQuery(state: EditorState, fallback?: SearchQuery) {
  let sel = state.selection.main
  let selText = sel.empty || sel.to > sel.from + 100 ? '' : state.sliceDoc(sel.from, sel.to)
  if (fallback && !selText) return fallback
  let config = state.facet(searchConfigFacet)
  return new SearchQuery({
    search: fallback?.literal ?? config.literal ? selText : selText.replace(/\n/g, '\\n'),
    caseSensitive: fallback?.caseSensitive ?? config.caseSensitive,
    literal: fallback?.literal ?? config.literal,
    wholeWord: fallback?.wholeWord ?? config.wholeWord,
  })
}
export const setSearchQuery = StateEffect.define<SearchQuery>()
const togglePanel = StateEffect.define<boolean>()
class SearchState {
  constructor(readonly query: StringQuery) {}
}
const searchState: StateField<SearchState> = StateField.define<SearchState>({
  create(state) {
    return new SearchState(defaultQuery(state).create())
  },
  update(value, tr) {
    for (let effect of tr.effects) {
      if (effect.is(setSearchQuery)) value = new SearchState(effect.value.create())
      else if (effect.is(togglePanel)) value = new SearchState(value.query)
    }
    return value
  },
})
const searchConfigFacet: Facet<SearchConfig, Required<SearchConfig>> = Facet.define({
  combine(configs) {
    return combineConfig(configs, {
      top: false,
      caseSensitive: false,
      literal: false,
      wholeWord: false,
    })
  },
})
function searchCommand(f: (view: EditorView, state: SearchState) => boolean): Command {
  return (view: EditorView) => {
    const state = view.state.field(searchState, false)
    return state && state.query.spec.valid ? f(view, state) : openSearch(view)
  }
}
function searchOpen(view: EditorView) {
  const state = view.state.field(searchState, false)
  return state && state.query.spec.valid
}
const openSearch: Command = (view) => {
  let state = view.state.field(searchState, false)
  view.dispatch({
    effects: [
      togglePanel.of(true),
      state
        ? setSearchQuery.of(defaultQuery(view.state, state.query.spec))
        : StateEffect.appendConfig.of(searchState),
    ],
  })
  return true
}

const replaceAll = searchCommand((view, { query }) => {
  if (view.state.readOnly) return false
  let changes = query.matchAll(view.state, 1e9)!.map((match) => {
    let { from, to } = match
    return { from, to, insert: query.getReplacement(match) }
  })
  if (!changes.length) return false
  let announceText = view.state.phrase('replaced $ matches', changes.length) + '.'
  view.dispatch({
    changes,
    effects: EditorView.announce.of(announceText),
    userEvent: 'input.replace.all',
  })
  return true
})

export function initSearchAndReplace(view: EditorView) {
  if (!searchOpen(view)) {
    return openSearch(view)
  }
  return true
}

export function searchAndReplace(view: EditorView, lastValue: string, newValue: string) {
  const query = new SearchQuery({ search: lastValue, replace: newValue })
  view.dispatch({ effects: setSearchQuery.of(query) })
  setTimeout(() => {
    replaceAll(view)
  }, 300)
}
