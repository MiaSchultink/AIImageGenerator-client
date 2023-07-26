import React from "react";

import './AddButton.css'

const AddButton = (props) =>{
    
    return (
        <button className={`form-add-btn ${props.inverse && 'form-add-btn--inverse'}`} onClick={props.onClick}>+</button>
    )
}

export default AddButton