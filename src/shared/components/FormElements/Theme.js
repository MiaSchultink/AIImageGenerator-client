import React from "react";
import './Theme.css'

const Theme = (props) =>{
    return (
        <div
          className={props.className}
          name={props.item}
          id={props.item}
          onClick={props.onClick} 
        >
          <div className="item-label">{props.item}</div>
        </div>
      );
}

export default Theme;