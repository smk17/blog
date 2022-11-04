export * from './request';
export * from './render-to-body';
export * from './parse-markdown';

export function errorToJSON(error: Error | unknown) {
  return {
    ...JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))),
  };
}

export function serializable<T>(o: T) {
  return JSON.parse(JSON.stringify(o));
}

export const isPC = () => {
  var userAgentInfo = navigator.userAgent;
  var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};

export const replaceStyle = (id: string, css: string) => {
  const style: any = document.getElementById(id);
  try {
    style.innerHTML = css;
  } catch (e) {
    console.log(e);
    style.styleSheet.cssText = css;
  }
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(style);
};
