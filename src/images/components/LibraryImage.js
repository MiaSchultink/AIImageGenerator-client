import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Image from "./Image";

const LibraryImage = (props) => {
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  const cardClickHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/image/${props.imgId}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      navigate(`/image/${props.imgId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
      <Image
        imgId={props.imgId}
        onClick={cardClickHandler}
        base64={props.base64}
        className="lib-img"
        imgName={props.imgName}
        height="200px"
        width="200px"
      ></Image>
    </React.Fragment>
  );
};

export default LibraryImage;
