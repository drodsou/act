import {tags, createTag} from '../act/act.js';
const {span} = tags;

/**
 * props: width, fill
 */
export default const SVGBox = createTag((props) => (
  span ({
    style:{
      display: 'inline-block',
      width: props.width || '24px',
      fill: props.fill || 'black',
    }, 
    ...props
  })
));