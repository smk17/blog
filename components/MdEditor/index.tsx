import dynamic from 'next/dynamic';

export const Editor = dynamic(() => import('./Lib'), {
  ssr: false,
});

interface EditorProps {
  /**
   * 默认标题
   */
  defaultTitle?: string;
  // /**
  //  * 右侧预览类型 pc 或者 mobile
  //  */
  // previewType?: PreviewType;
  /**
   * 默认编辑器内容
   */
  defaultText?: string;
  /**
   * 编辑器内容监听函数
   */
  onTextChange?: (text: string) => void;
}

export const MdEditor = (props: EditorProps) => (
  <div className="w-screen h-screen overflow-hidden">
    <Editor {...props} />;
  </div>
);
