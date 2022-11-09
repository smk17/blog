import { message } from 'antd';
import { makeAutoObservable } from 'mobx';
import throttle from 'lodash.throttle';
import { initMathJax, replaceStyle, wordCalc } from 'utils';
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

export interface MarkdownEditorProps {
  /**
   * 默认标题
   */
  defaultTitle?: string;
  /**
   * 默认编辑器内容
   */
  defaultValue?: string;
  onPublish?: (content: string) => Promise<void>;
}

export class Store {
  title: string;
  content: string;
  parseHtml: string;
  lineCount: number;
  wordCount: number;

  publishLoading?: boolean;
  onPublish?: () => Promise<void>;

  editorView?: EditorView;
  editor?: HTMLDivElement;
  preview?: HTMLDivElement;
  active: 'editor' | 'preview' = 'editor';
  constructor({ defaultTitle, defaultValue, onPublish }: MarkdownEditorProps) {
    this.title = defaultTitle || 'Markdown Editor';
    this.content = defaultValue || defaultContent;
    this.parseHtml = markdownParser.render(this.content);
    this.lineCount = this.content.split('\n').length;
    this.wordCount = wordCalc(this.content);
    this.onPublish = async () => {
      this.publishLoading = true;
      await onPublish?.(this.content);
      message.success('更新成功');
      this.publishLoading = false;
    };
    makeAutoObservable(this);
  }

  update(value: string) {
    this.content = value;
    this.parseHtml = markdownParser.render(this.content);
    this.lineCount = this.content.split('\n').length;
    this.wordCount = wordCalc(this.content);
    this.handleUpdateMathjax();
  }

  init(editor?: HTMLDivElement, preview?: HTMLDivElement) {
    this.editor = editor;
    this.preview = preview;

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
    const domEventHandlers = EditorView.domEventHandlers({
      scroll: throttle((event) => {
        this.previewScrollHandle(event);
      }, 80),
      // drop(event, view) {},
      // paste(event, view) {},
    });

    const startState = EditorState.create({
      doc: this.content,
      extensions: [
        theme,
        basicSetup,
        updateListener,
        domEventHandlers,
        EditorView.lineWrapping,
        markdown({ base: markdownLanguage, codeLanguages: languages }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: this.editor,
    });
    this.editorView = view;

    initMathJax();
  }

  mount = (editor?: HTMLDivElement, preview?: HTMLDivElement) => {
    this.init(editor, preview);
    if (this.preview) {
      this.preview.addEventListener('mouseover', this.mouseoverHandle, false);
      this.preview.addEventListener('mouseleave', this.mouseleaveHandle, false);
      this.preview.addEventListener('scroll', this.previewScrollHandle, false);
    }
  };

  unmount = () => {
    this.editorView?.destroy();
    if (this.preview) {
      this.preview.removeEventListener('mouseover', this.mouseoverHandle);
      this.preview.removeEventListener('mouseleave', this.mouseleaveHandle);
      this.preview.removeEventListener('scroll', this.previewScrollHandle);
    }
  };

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
