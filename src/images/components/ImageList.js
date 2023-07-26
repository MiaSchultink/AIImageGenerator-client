import React from "react";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Image from "./Image";

const ImageList = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();

  const cardClickHandler = async (id) => {
    try {
      await sendRequest(`http://localhost:5000/api/image/${id}`, "GET", null, {
        "Content-Type": "application/json",
      });
      navigate(`/image/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}></ErrorModal>
      {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
      <Card
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: 'wrap'
        }}
      >
        {props.images.map((img, index) => (
            <Image
              imgId={img._id}
              key={index}
              onClick={() => cardClickHandler(img._id)}
              base64={img.base64}
              className="lib-img"
              imgName={img.name}
              height={200}
              width={200*(img.width/img.height)  || 200}
            ></Image>
        ))}
      </Card>
    </React.Fragment>
  );
};

export default ImageList;
