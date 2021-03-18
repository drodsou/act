export default function table({root, label, state, onActive, onSelect}) {
  // -- debug
  //console.log(JSON.stringify(state||{}))

  if (!state) {
    root.innerHTML = ``;
    return
  }

  if (!state.all) {
    root.innerHTML = `loading...`;
    onActive();
    return;
  }

  if (state.all.length == 0) {
    root.innerHTML = `no data`;
    return;
  }

  let curr=Math.floor(Math.random() * 10000);
  root.innerHTML = /*html*/`
     <table id="table${curr}">
        <tr>
          ${Object.keys(state.all[0]).map(key=>`
            <th>${key}</th>
          `).join('\n')}
        </tr>
        ${state.all.map(row=>`
          <tr id="${row.id}">
            ${Object.values(row).map(value=>`
              <td>${value}</td>
            `).join('\n')}
          </tr>
        `).join('\n')}
      </table>

  `;

  // let input = root.querySelector(`#input${curr}`);
  // let datalist = root.querySelector(`#list${curr}`);
  // input.addEventListener("input",()=>{
  //   var val = input.value;
  //   var opts = datalist.childNodes;
  //   for (var i = 0; i < opts.length; i++) {
  //     if (opts[i].value === val) {
  //       // An item was selected from the list!
  //       state.selected = opts[i].value;
  //       onSelect()
  //       break;
  //     }
  //   }
  // });

}