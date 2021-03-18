const s = 'scope' + Math.floor(Math.random() * 10000);

const css = ()=>`
  .${s} {
    width: 24px;
    height:24px;
    position: relative;
    animation: ${s} 2s infinite linear;
  }

  @keyframes ${s} {
    from { transform: rotate(0deg); }
    to { transform: rotate(-359deg); }
  }
`;

export {
  s as cssScope,
  css
}
