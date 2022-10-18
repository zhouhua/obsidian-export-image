/* eslint-disable import/prefer-default-export */

type PseudoElement = ':before' | ':after';

function makeImage(uri: string): Promise<HTMLImageElement> {
  return new Promise(function (resolve, reject) {
    var image = new Image();
    image.onload = function () {
      resolve(image);
    };
    image.onerror = reject;
    image.src = uri;
  });
}
function asArray(arrayLike: { length: number, [key: string]: any }) {
  var array = [];
  var length = arrayLike.length;
  for (var i = 0; i < length; i++) array.push(arrayLike[i]);
  return array;
}
function makeNodeCopy(node: HTMLElement): Promise<HTMLElement> | HTMLElement {
  if (node instanceof HTMLCanvasElement) return makeImage(node.toDataURL());
  return node.cloneNode(false) as HTMLElement;
}

function cloneChildren(original: HTMLElement, clone: HTMLElement) {
  const children = original.childNodes;
  if (children.length === 0) return Promise.resolve(clone);

  return cloneChildrenInOrder(clone, asArray(children))
    .then(() => clone);

  function cloneChildrenInOrder(parent: HTMLElement, children: HTMLElement[]) {
    let done = Promise.resolve();
    children.forEach((child) => {
      done = done
        .then(() => cloneNode(child))
        .then((childClone) => {
          if (childClone) parent.appendChild(childClone);
        });
    });
    return done;
  }
}

function processClone(original: HTMLElement, clone: HTMLElement) {
  if (!(clone instanceof HTMLElement)) return clone;

  return Promise.resolve()
    .then(cloneStyle)
    .then(clonePseudoElements)
    .then(copyUserInput)
    .then(fixSvg)
    .then(() => clone);

  function cloneStyle() {
    copyStyle(window.getComputedStyle(original), clone.style);

    function copyStyle(source: CSSStyleDeclaration, target: CSSStyleDeclaration) {
      if (source.cssText) target.cssText = source.cssText;
      else copyProperties(source, target);

      function copyProperties(source: CSSStyleDeclaration, target: CSSStyleDeclaration) {
        asArray(source).forEach((name) => {
          target.setProperty(
            name,
            source.getPropertyValue(name),
            source.getPropertyPriority(name),
          );
        });
      }
    }
  }
  function uid() {
    return 'u' + ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
  }
  function clonePseudoElements() {
    ([':before', ':after'] as PseudoElement[]).forEach((element) => {
      clonePseudoElement(element);
    });

    function clonePseudoElement(element: PseudoElement) {
      const style = window.getComputedStyle(original, element);
      const content = style.getPropertyValue('content');

      if (content === '' || content === 'none') return;

      const className = uid();
      clone.className = `${clone.className} ${className}`;
      const styleElement = document.createElement('style');
      styleElement.appendChild(formatPseudoElementStyle(className, element, style));
      clone.appendChild(styleElement);

      function formatPseudoElementStyle(className: string, element: PseudoElement, style: CSSStyleDeclaration) {
        const selector = `.${className}:${element}`;
        const cssText = style.cssText ? formatCssText(style) : formatCssProperties(style);
        return document.createTextNode(`${selector}{${cssText}}`);

        function formatCssText(style: CSSStyleDeclaration) {
          const content = style.getPropertyValue('content');
          return `${style.cssText} content: ${content};`;
        }

      }
    }


    function formatCssProperties(style: CSSStyleDeclaration) {
      return `${asArray(style)
        .map(formatProperty)
        .join('; ')};`;

      function formatProperty(name: string) {
        return `${name}: ${style.getPropertyValue(name)
          }${style.getPropertyPriority(name) ? ' !important' : ''}`;
      }
    }
  }
  function copyUserInput() {
    if (original instanceof HTMLTextAreaElement) clone.innerHTML = original.value;
    if (original instanceof HTMLInputElement) clone.setAttribute('value', original.value);
  }

  function fixSvg() {
    if (!(clone instanceof SVGElement)) return;
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    if (!(clone instanceof SVGRectElement)) return;
    ['width', 'height'].forEach((attribute) => {
      const value = clone.getAttribute(attribute);
      if (!value) return;

      clone.style.setProperty(attribute, value);
    });
  }
}

export function cloneNode(node: HTMLElement): Promise<HTMLElement> {

  return Promise.resolve(node)
    .then(makeNodeCopy)
    .then((clone) => cloneChildren(node, clone))
    .then((clone) => processClone(node, clone));
}
export function delay(ms: number) {
  return function <T>(arg:T):Promise<T> {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(arg);
      }, ms);
    });
  };
}
