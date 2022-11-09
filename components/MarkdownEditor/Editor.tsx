import { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import { Button, Result } from 'antd';
import { isPC } from 'utils';
import { useMount, useUnmount } from 'ahooks';
import { SmileOutlined } from '@ant-design/icons';
import { CODE_THEME_ID, PREVIEW_ID, THEME_ID } from './constant';
import { MarkdownEditorProps, Store } from './store';

import 'antd/lib/message/style';
import 'antd/lib/button/style';
import 'antd/lib/result/style';

interface EditorProps {
  store: Store;
}

const Editor = observer<EditorProps>(({ store }) => {
  const editor = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const { title, content, parseHtml, lineCount, wordCount, publishLoading, onPublish } = store;
  useMount(() => store.mount(editor.current!, preview.current!));
  useUnmount(() => store.unmount());

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="flex items-center h-8 flex-none relative z-20 bg-white shadow-[0_4px_10px_rgb(0,0,0,0.05)]">
        <div className="flex-1 flex items-center justify-start">
          <section className="text-base pl-5 pr-2 font-bold">{title}</section>
        </div>
        <div className="flex items-center justify-end">
          <Button loading={publishLoading} type="primary" onClick={onPublish}>
            发布
          </Button>
        </div>
      </div>
      <div className="flex w-full h-[calc(100vh-3.5rem)]">
        <div className="flex-1 w-1/3 relative text-base bg-neutral-100">
          <div ref={editor} className="CodeMirror w-full h-full overflow-auto"></div>
        </div>

        <div className="flex-1 w-1/3 p-5 relative flex justify-center">
          <div
            className="overflow-y-auto py-6 px-5 h-full w-[375px] shadow-[0_0_60px_rgb(0,0,0,0.1)]"
            ref={preview}
          >
            <section
              id={PREVIEW_ID}
              data-tool="mdnice编辑器"
              data-website="https://www.mdnice.com"
              dangerouslySetInnerHTML={{
                __html: parseHtml,
              }}
            />
          </div>
        </div>
      </div>
      <div className="px-2 w-full h-6 flex justify-between">
        <div className="flex items-center text-xs bg-white">
          <div className="m-0 px-3">
            行数：
            {lineCount}
          </div>
          <div className="m-0 px-3">
            字数：
            {wordCount}
          </div>
          <div className="m-0 px-3">主题：全栈蓝</div>
        </div>
      </div>
    </div>
  );
});

function MarkdownEditor(props: MarkdownEditorProps) {
  const render = () => {
    if (isPC()) return <Editor store={new Store(props)} />;
    return (
      <Result
        icon={<SmileOutlined />}
        title="请使用 PC 端打开排版工具"
        subTitle="更多 Markdown Nice 信息，请扫码关注公众号「编程如画」"
      />
    );
  };
  return render();
}

export default MarkdownEditor;
