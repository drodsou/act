# act

- Act = Preact + hyperscript-helpers (alternative to JSX),  in the browser with ES6 imports, no bundling needed
- 12kb minified, <5k gziped
- Ideal to enhance vanilla js or plain html with efficient dynamic components
- Nice syntax (nicer than JSX when you get used)

- example:

```html
<div id="app"></div>
<script type="module">
  import {tags, createTag, render} from '../dist/act-preact.min.js';
  
  // -- all standard html tags available
  const {div, h1, button} = tags;

  // -- custom component
  const Counter = createTag( (props, self) => (
    button( {onClick: ()=>self.setState(s=>({count:s.count+1})) },
      'Counter: ', self.state.count
    )
  ), {state:{count:5}});  // equivalent to class constructor 'this', accessed with `self` above

  // -- main component
  const App = createTag((props)=>(
    div( 
      h1('Act'),
      Counter(),
    )
  ));

  // -- render (could have several ones)
  render(App,"#app");  
</script>
```

- More examples in `act/_examples`


## hyperhelper goodies

- less ${``} than htm
- everyting is a function, code validation, type checking
- comments (just code)
- createTag allows to custom syntax transformation