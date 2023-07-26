import React, { useEffect, useState, useContext } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import ImageList from "../components/ImageList";

const ImageLibrary = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const userId = auth.userId;
  const [images, setImages] = useState([]);

  useEffect(() => {
    const findImages = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/image/all",
          "GET",
          null,
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        setImages(responseData.images);
      } catch (err) {
        console.log(err);
      }
    };
    findImages();
  }, [userId, sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}></ErrorModal>
      {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
      <ImageList images={images}></ImageList>
    </React.Fragment>
  );
};

export default ImageLibrary;
