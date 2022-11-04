import { useMemo, useRef } from 'react';
import Head from 'next/head';
import { EditorView } from 'codemirror';
import { Result } from 'antd';
import { isPC, replaceStyle } from 'utils';
import { useControllableValue, useMount } from 'ahooks';
import { SmileOutlined } from '@ant-design/icons';
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { markdownParser } from './utils/helper';
import { basic, githubLight } from './theme';
import { THEME_ID } from './constant';

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

  useMount(() => {
    // 初始化整体主题
    replaceStyle(THEME_ID, basic);
  });

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
  const render = () => {
    if (isPC())
      return (
        <div className="w-screen h-screen overflow-hidden">
          <div className="flex items-center h-8 flex-none relative z-20 bg-white shadow-[0_4px_10px_rgb(0,0,0,0.05)]">
            <div className="flex-1 flex items-center justify-start">
              <section className="text-base pl-5 pr-2 font-bold">{props.defaultTitle}</section>
            </div>
          </div>
          <div className="flex w-full h-[calc(100vh-3.5rem)]">
            <div className="flex-1 w-1/3 relative" onMouseOver={() => setCurrentIndex(1)}>
              <CodeMirror
                ref={markdownEditor}
                value={value}
                theme={githubLight}
                width={'100%'}
                basicSetup={{ lineNumbers: false, foldGutter: false }}
                className="CodeMirror w-full h-full p-5 overflow-x-hidden overflow-y-auto relative bg-neutral-100"
                extensions={[
                  EditorView.lineWrapping,
                  markdown({ base: markdownLanguage, codeLanguages: languages }),
                ]}
                onChange={onChange}
                onScroll={handleScroll}
              />
            </div>

            <div
              className="flex-1 w-1/3 p-5 relative flex justify-center"
              onMouseOver={() => setCurrentIndex(2)}
            >
              <div
                className="overflow-y-auto py-6 px-5 h-full w-[375px] shadow-[0_0_60px_rgb(0,0,0,0.1)]"
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
          <div className="px-2 w-full h-6 flex justify-between">
            <div className="flex items-center text-xs bg-white">
              <div className="m-0 px-3">主题：全栈蓝</div>
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
  };
  return (
    <>
      <Head>
        <style id={THEME_ID}></style>
      </Head>
      {render()}
    </>
  );
}

export default MarkdownEditor;
