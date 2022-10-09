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
  onChange?: (value?: string) => void;
}

export const MdEditor = (props: EditorProps) => (
  <Editor
    {...props}
    onChange={({ text }) => props.onChange?.(text)}
    renderHTML={parseMarkdown}
  />
);
