import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeDocument from "rehype-document";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

export const parseMarkdown = async (docContent: string) => {
  try {
    const file = await unified()
      .use(remarkParse)
      .use(remarkMath)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeHighlight)
      .use(rehypeKatex)
      .use(rehypeDocument)
      .use(rehypeStringify)
      .process(docContent);
    return file.toString();
  } catch (error) {
    return `markdown语法解析失败，失败原因：${String(error)}`;
  }
};
