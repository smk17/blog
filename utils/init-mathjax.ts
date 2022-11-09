import { MJX_DATA_FORMULA, MJX_DATA_FORMULA_TYPE } from 'components/MarkdownEditor/constant';

export function initMathJax() {
  const addContainer = (math: any, doc: any) => {
    const tag = 'span';
    const spanClass = math.display ? 'span-block-equation' : 'span-inline-equation';
    const cls = math.display ? 'block-equation' : 'inline-equation';
    math.typesetRoot.className = cls;
    math.typesetRoot.setAttribute(MJX_DATA_FORMULA, math.math);
    math.typesetRoot.setAttribute(MJX_DATA_FORMULA_TYPE, cls);
    math.typesetRoot = doc.adaptor.node(tag, { class: spanClass, style: 'cursor:pointer' }, [
      math.typesetRoot,
    ]);
  };
  try {
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$']],
        displayMath: [['$$', '$$']],
        tags: 'ams',
      },
      svg: {
        fontCache: 'none',
      },
      options: {
        renderActions: {
          addMenu: [0, '', ''],
          addContainer: [
            190,
            (doc: any) => {
              for (const math of doc.math) {
                addContainer(math, doc);
              }
            },
            addContainer,
          ],
        },
      },
    };
    // eslint-disable-next-line
    require('mathjax/es5/tex-svg-full');
  } catch (e) {
    console.log(e);
  }
}
