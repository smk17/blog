import dynamic from "next/dynamic";
import { parseMarkdown } from "utils";

export const Editor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});


interface EditorProps {
  id?: string;
  defaultValue?: string;
  value?: string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  onChange?: (
    data: {
      text: string;
      html: string;
    },
    event?: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

export const MdEditor = (props: EditorProps) => (
  <Editor {...props} renderHTML={parseMarkdown} />
);
