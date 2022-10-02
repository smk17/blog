import ReactDOM from 'react-dom';
import { ReactElement } from 'react';
import { resolveContainer } from './resolve-container';

export function renderToBody(element: ReactElement) {
  const container = document.createElement('div');
  resolveContainer().appendChild(container);
  function unmount() {
    const unmountResult = ReactDOM.unmountComponentAtNode(container);
    if (unmountResult && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }
  ReactDOM.render(element, container);
  return unmount;
}
