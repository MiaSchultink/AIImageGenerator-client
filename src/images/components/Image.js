import React from "react";
import './Image.css'

const Image = (props) => {
  return (
    <img
      width={props.width}
      height={props.height}
      src={props.base64}
      alt={props.imgName}
      name={props.imgName}
      className={props.className}
      onClick={props.onClick}
      id={props.imgId}
    ></img>
  );
};
export default Image;
