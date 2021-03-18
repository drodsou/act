const s = 'scope' + Math.floor(Math.random() * 10000);

const css = ()=>`
  .${s} {
    position:relative;
    width: 100%;
  }

  .${s} .inputContainer {
    width: 100%;
    display:flex;
    border: 1px solid black;
  }

  .${s} input {
    flex:1;
    border: 0px;
    border-right: 1px solid black;
  }

  .${s} .arrow {
    width: 24px;
    height:24px;
    padding:0;
    margin:0;
    transform: rotate(90deg);
    transition: transform 0.3s linear;
  }

  .${s} .arrowup {
    transform: rotate(30deg);
  }


  .${s} ul {
    list-style-type: none; 
    padding: 0px; 
    margin: 0; 
    border: 1px solid black;
    width: 100%;
    overflow-y: scroll;
    overflow-x: none;
    display: none;
    position: absolute;
    margin-top: 0px;
    z-index: 9999;
    background-color: white;
    max-height: 90px;
  }

  .${s} ul.visible {
    display: block;
  }

  .${s} li {
    padding: 3px;
  }

  .${s} li.pointed {
    background-color: #fee;
  }

  .${s} li.selected {
    background-color: #ddd;
  }
`;

export {
  s as cssScope,
  css
}
