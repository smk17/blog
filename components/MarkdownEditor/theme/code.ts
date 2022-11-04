/**
 * @name github
 */
 import { tags as t } from '@lezer/highlight';
 import { createTheme } from '@uiw/codemirror-themes';
 
 export const githubLight = createTheme({
   theme: 'light',
   settings: {
     background: '#f5f5f5',
     foreground: '#24292e',
     selection: '#BBDFFF',
     selectionMatch: '#BBDFFF',
     gutterBackground: '#f5f5f5',
     gutterForeground: '#6e7781',
     lineHighlight: '#f5f5f5',
   },
   styles: [
     { tag: [t.comment, t.bracket], color: '#6a737d' },
     { tag: [t.className, t.propertyName], color: '#6f42c1' },
     { tag: [t.variableName, t.attributeName, t.number, t.operator], color: '#005cc5' },
     { tag: [t.keyword, t.typeName, t.typeOperator, t.typeName], color: '#d73a49' },
     { tag: [t.string, t.meta, t.regexp], color: '#032f62' },
     { tag: [t.name, t.quote], color: '#22863a' },
     { tag: [t.heading], color: '#24292e', fontWeight: 'bold' },
     { tag: [t.emphasis], color: '#24292e', fontStyle: 'italic' },
     { tag: [t.deleted], color: '#b31d28', backgroundColor: 'ffeef0' },
   ],
 });
 
 export const githubDark = createTheme({
   theme: 'dark',
   settings: {
     background: '#0d1117',
     foreground: '#c9d1d9',
     caret: '#c9d1d9',
     selection: '#003d73',
     selectionMatch: '#003d73',
     lineHighlight: '#36334280',
   },
   styles: [
     { tag: [t.comment, t.bracket], color: '#8b949e' },
     { tag: [t.className, t.propertyName], color: '#d2a8ff' },
     { tag: [t.variableName, t.attributeName, t.number, t.operator], color: '#79c0ff' },
     { tag: [t.keyword, t.typeName, t.typeOperator, t.typeName], color: '#ff7b72' },
     { tag: [t.string, t.meta, t.regexp], color: '#a5d6ff' },
     { tag: [t.name, t.quote], color: '#7ee787' },
     { tag: [t.heading], color: '#d2a8ff', fontWeight: 'bold' },
     { tag: [t.emphasis], color: '#d2a8ff', fontStyle: 'italic' },
     { tag: [t.deleted], color: '#ffdcd7', backgroundColor: 'ffeef0' },
   ],
 });
 