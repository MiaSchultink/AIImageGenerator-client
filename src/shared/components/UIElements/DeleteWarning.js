import React, { useState, useContext } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import Modal from "./Modal";
import Button from "../FormElements/Button";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const DeleteWarning = (props) =>{
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const navigate = useNavigate()

    const confirmDelete = async (event) =>{
        event.preventDefault();
        const cancelFunction = props.cancel;
        cancelFunction();
        try {
          await sendRequest(
            `http://localhost:5000/api/image/delete/${props.imgId}`,
            "POST",
            null,
            {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth.token,
            }
          );
          navigate('/image/library')
        } catch (err) {
          console.log(err);
        }
    }

    return(
        <React.Fragment>
        {isLoading &&  <LoadingSpinner asOverlay></LoadingSpinner>}
      <Modal
        show={props.show}
        onCancel={props.cancel}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={props.cancel}>
              CALNCEL
            </Button>
            <Button danger onClick={confirmDelete}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this image? Please note that this
          cannot be undone.
        </p>
      </Modal>
      </React.Fragment>
    )
}

export default DeleteWarning;