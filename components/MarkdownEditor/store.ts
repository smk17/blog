import { makeAutoObservable } from 'mobx';
import throttle from 'lodash.throttle';
import { replaceStyle, wordCalc } from 'utils';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { markdownParser, updateMathjax } from './utils/helper';
import { basic, theme, xcode, defaultContent } from './theme';
import {
  CODE_THEME_ID,
  MJX_DATA_FORMULA,
  MJX_DATA_FORMULA_TYPE,
  THEME_ID,
  THROTTLE_MATHJAX_TIME,
} from './constant';
import { EditorState } from '@codemirror/state';
import { EditorView, basicSetup } from 'codemirror';

export class Store {
  content: string;
  parseHtml: string;
  lineCount: number;
  wordCount: number;

  editorView?: EditorView;
  editor?: HTMLDivElement;
  preview?: HTMLDivElement;
  active: 'editor' | 'preview' = 'editor';
  constructor(public title?: string, defaultValue?: string) {
    this.content = defaultValue ?? defaultContent;
    this.parseHtml = markdownParser.render(this.content);
    this.lineCount = this.content.split('\n').length;
    this.wordCount = wordCalc(this.content);
    makeAutoObservable(this);
  }

  update(value: string) {
    this.content = value;
    this.parseHtml = markdownParser.render(this.content);
    this.lineCount = this.content.split('\n').length;
    this.wordCount = wordCalc(this.content);
    // this.handleUpdateMathjax();
  }

  init(editor?: HTMLDivElement, preview?: HTMLDivElement) {
    this.editor = editor;
    this.preview = preview;
    this.previewMount();

    // 初始化整体主题
    replaceStyle(THEME_ID, basic);
    // 初始化代码主题
    replaceStyle(CODE_THEME_ID, xcode);

    const updateListener = EditorView.updateListener.of((vu) => {
      if (vu.docChanged) {
        const doc = vu.state.doc;
        this.update(doc.toString());
      }
    });
    const syncScroll = EditorView.domEventHandlers({
      scroll: throttle((event) => {
        this.previewScrollHandle(event);
      }, 80),
    });

    const startState = EditorState.create({
      doc: this.content,
      extensions: [
        theme,
        syncScroll,
        basicSetup,
        updateListener,
        EditorView.lineWrapping,
        markdown({ base: markdownLanguage, codeLanguages: languages }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: this.editor,
    });
    this.editorView = view;

    const addContainer = (math: any, doc: any) => {
      const tag = 'span';
      const spanClass = math.display ? 'span-block-equation' : 'span-inline-equation';
      const cls = math.display ? 'block-equation' : 'inline-equation';
      math.typesetRoot.className = cls;
      math.typesetRoot.setAttribute(MJX_DATA_FORMULA, math.math);
      math.typesetRoot.setAttribute(MJX_DATA_FORMULA_TYPE, cls);
      math.typesetRoot = doc.adaptor.node(tag, { class: spanClass, style: 'cursor:pointer' }, [
        math.typesetRoot,
      ]);
    };
    try {
      window.MathJax = {
        tex: {
          inlineMath: [['$', '$']],
          displayMath: [['$$', '$$']],
          tags: 'ams',
        },
        svg: {
          fontCache: 'none',
        },
        options: {
          renderActions: {
            addMenu: [0, '', ''],
            addContainer: [
              190,
              (doc: any) => {
                for (const math of doc.math) {
                  addContainer(math, doc);
                }
              },
              addContainer,
            ],
          },
        },
      };
      // eslint-disable-next-line
      require('mathjax/es5/tex-svg-full');
    } catch (e) {
      console.log(e);
    }
  }

  previewMount() {
    if (this.preview) {
      this.preview.addEventListener('mouseover', this.mouseoverHandle, false);
      this.preview.addEventListener('mouseleave', this.mouseleaveHandle, false);
      this.preview.addEventListener('scroll', this.previewScrollHandle, false);
    }
  }

  previewUnMount() {
    if (this.preview) {
      this.preview.removeEventListener('mouseover', this.mouseoverHandle);
      this.preview.removeEventListener('mouseleave', this.mouseleaveHandle);
      this.preview.removeEventListener('scroll', this.previewScrollHandle);
    }
  }

  handleUpdateMathjax = throttle(updateMathjax, THROTTLE_MATHJAX_TIME);
  mouseoverHandle = () => (this.active = 'preview');
  mouseleaveHandle = () => (this.active = 'editor');

  previewScrollHandle = (event: Event) => {
    const target = event.target as HTMLDivElement;
    const percent = target.scrollTop / target.scrollHeight;
    if (this.active === 'editor' && this.preview) {
      const previewHeihgt = this.preview?.scrollHeight || 0;
      this.preview!.scrollTop = previewHeihgt * percent;
    } else if (this.editorView) {
      const editorScrollDom = this.editorView.scrollDOM;
      const editorScrollHeihgt = this.editorView.scrollDOM.scrollHeight || 0;
      editorScrollDom.scrollTop = editorScrollHeihgt * percent;
    }
  };
}
