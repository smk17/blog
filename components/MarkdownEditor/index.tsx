import dynamic from 'next/dynamic';
import 'antd/dist/antd.variable.min.css';

export type { MarkdownEditorProps } from './store';

export const MarkdownEditor = dynamic(() => import('./Editor'), {
  ssr: false,
});
