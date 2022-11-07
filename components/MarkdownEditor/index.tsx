import dynamic from 'next/dynamic';

export type { MarkdownEditorProps } from './store';

export const MarkdownEditor = dynamic(() => import('./Editor'), {
  ssr: false,
});
