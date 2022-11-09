export * from './request';
export * from './render-to-body';
export * from './parse-markdown';
export * from './init-mathjax';

export function errorToJSON(error: Error | unknown) {
  return {
    ...JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))),
  };
}

export function serializable<T>(o: T): T {
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

export const wordCalc = (data: string) => {
  const pattern =
    /[a-zA-Z0-9_\u0392-\u03c9\u0410-\u04F9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;
  const m = data.match(pattern);
  let count = 0;
  if (m === null) return count;
  for (let i = 0; i < m.length; i++) {
    if (m[i].charCodeAt(0) >= 0x4e00) {
      count += m[i].length;
    } else {
      count += 1;
    }
  }
  return count;
};
