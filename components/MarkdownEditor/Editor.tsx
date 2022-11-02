import { SmileOutlined } from '@ant-design/icons';
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { Result } from 'antd';
import { isPC } from 'utils';
import { useControllableValue } from 'ahooks';
import { useMemo, useRef } from 'react';
import { markdownParser } from './utils/helper';

export interface MarkdownEditorProps {
  /**
   * 默认标题
   */
  defaultTitle?: string;
  /**
   * 默认编辑器内容
   */
  value?: string;
  /**
   * 编辑器内容监听函数
   */
  onChange?: (value: string) => void;
}

function MarkdownEditor(props: MarkdownEditorProps) {
  const indexRef = useRef<number>();
  const markdownEditor = useRef<ReactCodeMirrorRef>(null);
  const previewWrap = useRef<HTMLElement>(null);
  const previewContainer = useRef<HTMLDivElement>(null);
  const [value, onChange] = useControllableValue<string>(props);
  const parseHtml = useMemo(() => markdownParser.render(value), [value]);

  const handleScroll = () => {
    // if (markdownEditor.current) {
    //   const cmData = markdownEditor.current?.view?.get;
    //   const editorToTop = cmData.top;
    //   const editorScrollHeight = cmData.height - cmData.clientHeight;
    //   this.scale =
    //     (this.previewWrap.offsetHeight - this.previewContainer.offsetHeight + 55) /
    //     editorScrollHeight;
    //   if (this.index === 1) {
    //     this.previewContainer.scrollTop = editorToTop * this.scale;
    //   } else {
    //     this.editorTop = this.previewContainer.scrollTop / this.scale;
    //     markdownEditor.scrollTo(null, this.editorTop);
    //   }
    // }
  };

  const setCurrentIndex = (inx: number) => {
    indexRef.current = inx;
  };
  if (isPC())
    return (
      <div className="w-screen h-screen overflow-hidden flex">
        <div id="nice-md-editor" onMouseOver={() => setCurrentIndex(1)}>
          <CodeMirror
            ref={markdownEditor}
            width="60vw"
            height="100%"
            value={value}
            extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
            onChange={onChange}
            onScroll={handleScroll}
          />
        </div>

        <div
          id="nice-rich-text"
          className="nice-marked-text"
          onMouseOver={() => setCurrentIndex(2)}
        >
          <div
            id={'nice-rich-text-box'}
            className={'nice-marked-text'}
            onScroll={handleScroll}
            ref={previewContainer}
          >
            <section
              id={'nice'}
              data-tool="mdnice编辑器"
              data-website="https://www.mdnice.com"
              dangerouslySetInnerHTML={{
                __html: parseHtml,
              }}
              ref={previewWrap}
            />
          </div>
        </div>
      </div>
    );
  return (
    <Result
      icon={<SmileOutlined />}
      title="请使用 PC 端打开排版工具"
      subTitle="更多 Markdown Nice 信息，请扫码关注公众号「编程如画」"
    />
  );
}

export default MarkdownEditor;
