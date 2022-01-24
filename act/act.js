// -- sources: https://cdn.esm.sh

// import {useState, useRef, useEffect} from './_vendor/preact-hooks.js';

// ---------------------------------------------------------------------
// -- PREACT
import {createElement as h, Component, render as originalRender } from './_vendor/preact.js';

// // -- REACT DEVELOPMENT 
// import {createElement as h, Component} from './_vendor/react.development.js';
// import {render as originalRender} from './_vendor/react-dom.development.js';
// ---------------------------------------------------------------------

const RENDERER = h.name ==='createElementWithValidation' 
  ? 'react' 
  : 'preact';

function isClass(func) {
  return typeof func === 'function' 
    && /^class\s/.test(Function.prototype.toString.call(func));
}


/**
 * createTag
 */
function createTag (tagDefOri, opts={}) {
  let tagDef = tagDefOri;
  if ( typeof tagDef === 'function' 
    && !isClass(tagDefOri) 
    && opts !== undefined
  ) {

    tagDef = class extends Component {
      constructor() {
        super();
        this.forceUpdate = this.forceUpdate.bind(this);
        this.tagDef = tagDefOri;
        Object.assign(this, opts)
        if (opts.$data) {
          this.$data = privateReactiveObj(opts.$data, this.forceUpdate)
        }
      }
      render (props) {
        return this.tagDef(props, this)
      }  // render
    } // class
  } // --convert to class

  function tag (...all) {
    let element;
    if (
      (RENDERER==='react' && typeof(all[0]) === 'object' && !(all[0]?.hasOwnProperty("$$typeof")))
      || (RENDERER==='preact' && typeof(all[0]) === 'object' && !(all[0]?.constructor===undefined))
    ) {
      // first element is plain props, no need to add it
      if (RENDERER === 'react') {
        //some magic translations for react
        let props = all[0];
        if (props.class) {
          props.className = props.class;
          delete(props.class);
        }
        if (typeof(props.style) === 'string') {
          props.style = cssToObj(props.style);
        }
      }
      element = h(tagDef, ...all)
    } else {
      // add missing props object
      element = h(tagDef, {}, ...all)
    }
    return element;
  }

  // if (typeof(tagDef) === 'string') console.log(tagDef);

  return tag
}

const TAG_NAMES = [
  'a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside',
  'audio', 'b', 'base', 'basefont', 'bdi', 'bdo', 'bgsound', 'big', 'blink',
  'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite',
  'code', 'col', 'colgroup', 'command', 'content', 'data', 'datalist', 'dd',
  'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em',
  'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form',
  'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header',
  'hgroup', 'hr', 'html', 'i', 'iframe', 'image', 'img', 'input', 'ins',
  'isindex', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'listing',
  'main', 'map', 'mark', 'marquee', 'math', 'menu', 'menuitem', 'meta',
  'meter', 'multicol', 'nav', 'nextid', 'nobr', 'noembed', 'noframes',
  'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param',
  'picture', 'plaintext', 'pre', 'progress', 'q', 'rb', 'rbc', 'rp', 'rt',
  'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'shadow', 'slot',
  'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub',
  'summary', 'sup', 'svg', 'table', 'tbody', 'td', 'template', 'textarea',
  'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'tt', 'u', 'ul',
  'var', 'video', 'wbr', 'xmp'
];

const tags = {}
TAG_NAMES.forEach(tag=>tags[tag] = createTag(tag));


const allUpdaters = [];
/**
 * example: const update = render(App,"#app")
*/
function render (tag, root) {
  let renderTag = tag; 
  let renderRoot = typeof(root === "string") ? document.querySelector(root) : root;
  function update() {
    originalRender(renderTag(), renderRoot);
  }
  allUpdaters.push(update);
  update();
}

function forceUpdate() {
  allUpdaters.forEach(upd=>upd())
}

function reactiveObj (obj={}) {
  return privateReactiveObj( obj, forceUpdate );
}

export {
  tags, createTag, render, reactiveObj, forceUpdate,
  RENDERER, h, Component
  // useState, useRef, useEffect,
}


// -- HELPERS

function privateReactiveObj (obj={}, update) {
  let rObj = new Proxy(obj, {
    set(target, prop, val) { // to intercept property writing
      target[prop] = val;
      update()
      return true;
    } 
  });
  return rObj;
}



function cssToObj(css) {
  let obj = {};
  let s = css
    .toLowerCase()
    .replace(/-(.)/g, (m, g) => g.toUpperCase())
    .replace(/;\s?$/g,"")
    .split(/:|;/g);
  for (var i=0; i<s.length; i+=2) {
    obj[s[i].replace(/\s/g,"")] = s[i+1].replace(/^\s+|\s+$/g,"");
  }
  return obj;
}