/**
 * @name github
 */
import { EditorView } from 'codemirror';

export const theme = EditorView.theme({
  '&': { height: 'calc(100vh - 3.5rem)' },
  '.cm-scroller': { overflow: 'auto' },
});
