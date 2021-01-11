window.$ = window.jQuery = function (selectorOrArray) {
  let elements;
  if (typeof selectorOrArray === "string") {
    elements = document.querySelectorAll(selectorOrArray);
  } else if (selectorOrArray instanceof Object) {
    elements = selectorOrArray;
  }
  const api = Object.create(jQuery.prototype);
  // const api = {__proto__: jQuery.prototype}
  Object.assign(api, {
    // api.elements = elements;
    // api.oldApi = selectorOrArray.oldApi;
    elements: elements,
    oldApi: selectorOrArray.oldApi,
  });
  return api;
};

jQuery.fn = jQuery.prototype = {
  constructor: jQuery,
  jquery: true,
  get(index) {
    return elements[index];
  },
  find(selector) {
    let array = [];
    for (let i = 0; i < elements.length; i++) {
      array = array.concat(Array.from(elements[i].querySelectorAll(selector)));
    }
    array.oldApi = this;
    return jQuery(array);
  },
  parent() {
    const array = [];
    this.each((node) => {
      if (array.indexOf(node.parentNode) === -1) {
        array.push(node.parentNode);
      }
    });
    return jQuery(array);
  },
  children() {
    const array = [];
    this.each((node) => {
      array.push(...node.children);
    });
    return jQuery(array);
  },
  print() {
    console.log(elements);
  },
  each(fn) {
    for (let i = 0; i < elements.length; i++) {
      fn.call(null, elements[i], i);
    }
    return this;
  },
  addClass(className) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add(className);
    }
    return this;
  },
  end() {
    return this.oldApi;
  },
};
