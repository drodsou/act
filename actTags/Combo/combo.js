import { html, useState } from '../../act/act.js';
import {cssScope, css} from './combo.css.js';

const removeAccents = (str) => {
  return (str||'').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
};


/**
 * props: { data: [{id,desc}...], input, onType, onSelect }
 */
export default function Combo (props) {

  let [state, setState] = useState({
    input: '',
    pointed : undefined, // id
    open : false,
  });

  // shorter secure state change
  let setSt = obj=>setState(st=>({...st, ...obj}));
  
  let onType = props.onType || function(){};

  let filtered = (txt)=>props.data
    .filter(dRow=>removeAccents(String(dRow.desc)).includes(removeAccents(txt||state.input)))
    .map(dRow=>({
      id:'id-'+dRow.id, 
      desc:String(dRow.desc)
    }));
  
  let handleListClick = (e)=>{
    let dId = e.target.id.slice(3);
    triggerOnSelect(dId)
  }

  let triggerOnSelect = (dId)=>{
    //let dRow = props.data.find(dRow=>String(dRow.id) === dId);
    // setSt({input:dRow.desc, pointed: 'id-'+dId, open:false});
    console.log('combo.triggerOnSelect', dId, 'closing')
    // setTimeout(()=>props.onSelect(dRow), 1000);
    setSt({open:false})
  }



  const handleLiMouseOver = (e)=>{
    setSt({pointed:e.target.id});
  }

  const handleUlKeyUp = (e)=>{
    if (e.keyCode == 13) {  // enter
      triggerOnSelect(state.pointed.slice(3))
      return;
    }

    if (e.keyCode == 27) {  // escape
      setState(st=>({...st, input:'', open:!st.open}));
      return;
    }

    let index = filtered().findIndex(fRow=>fRow.id === state.pointed);
    let newPointed
    if ((e.keyCode == 38 || e.keyCode == 40) && index === -1 ) { // up or down
      newPointed = filtered()[0]?.id;
    }
    else if (e.keyCode == 38 && index > 0 ) { // up
      newPointed = filtered()[index-1]?.id
    }
    else if (e.keyCode == 40 && index < filtered().length-1 ) { // down
      newPointed = filtered()[index+1]?.id
    }

    if (newPointed) {
      setSt({pointed: newPointed })
    }

    setSt({open:true});

    // setTimeout(()=>{
    //   console.log(newPointed, state.pointed)
    // }, 1000);
    document.querySelector(`.${cssScope} #${newPointed}`)?.scrollIntoView();
   
  }

  const handleInputChange = (e)=>{
    let inputValue = e.target.value;
    console.log("match", inputValue, filtered(inputValue)[0])
    setSt({input: inputValue, pointed: filtered(inputValue)[0]?.id});
  }

  const handleArrowClick = (e)=>{
    setState(st=>({...st, input:'', open:!st.open}));
  }
  // onBlur=${()=>setState({open:false})} 
  // onKeyPress=${()=>console.log('keypress')}          
  
  console.log('como rendering. open:', state.open);
  return html`
    <div className=${cssScope} onClick=${handleArrowClick}>
      <style>${css()}</style>
      <div className="inputContainer">
      <input value=${state.input} 
        onFocus=${()=>setSt({open:true})} 
        onKeyUp=${handleUlKeyUp}
        onChange=${handleInputChange}
      />  
      <span className=${ `arrow ${state.open ? 'arrowup' : ''}` }>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M8 5v14l11-7z"/></svg>
      </span>
      </div>
      <ul onClick=${handleListClick} 
        className=${state.open ? 'visible' : ''}
      >
        ${filtered().map((fRow,fIndex)=>html`
          <li key=${fIndex} id=${fRow.id} className=${fRow.id === state.pointed ? 'pointed' :''}
            onMouseOver=${handleLiMouseOver}  
          >
            ${fRow.desc}
          </li>
        `)}
      </ul> 
    </div>
  `;

}

