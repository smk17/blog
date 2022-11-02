import dynamic from 'next/dynamic';

export type { MarkdownEditorProps } from './Editor';

export const MarkdownEditor = dynamic(() => import('./Editor'), {
  ssr: false,
});
