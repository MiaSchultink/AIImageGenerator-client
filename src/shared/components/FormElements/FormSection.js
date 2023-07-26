import React from "react";

import './FormSection.css'
const FormSection = (props) =>{
    return (
        <div className={`form-section ${props.className}`} style={props.style}>
          {props.children}
        </div>
      );
}

export default FormSection


