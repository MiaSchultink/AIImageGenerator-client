import React, { useState, useContext } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import Modal from "./Modal";
import Button from "../FormElements/Button";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import ErrorModal from "./ErrorModal";

const DeleteWarning = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const confirmDelete = async (event) => {
    event.preventDefault();
    const cancelFunction = props.cancel;
    cancelFunction();
    let url = "";
    let body = null;
    switch (props.type) {
      case "image":
        url += `/image/delete/${props.id}`;
        break;
      case "user":
        url += "/users/delete";
        body= JSON.stringify({userId: auth.userId})
        auth.logout()
        break;
    }
    try {
      await sendRequest(
        url,
        "POST",
        body,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      navigate("/image/library");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
      <ErrorModal error={error} onClear={clearError}></ErrorModal>
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
          {`Do you want to proceed and delete this ${props.type}? Please note that this
          cannot be undone`}.
        </p>
      </Modal>
    </React.Fragment>
  );
};

export default DeleteWarning;
