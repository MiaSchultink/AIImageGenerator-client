import React from "react"
import Card from "../../shared/components/UIElements/Card"
import './Error.css'

const NotFound = (props) =>{
    return (
        <Card>
            <div className="error-code">{props.code}</div>
            <div className="error-message">{props.message}</div>
        </Card>
    )
}

export default NotFound