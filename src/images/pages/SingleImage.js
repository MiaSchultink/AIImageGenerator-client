import React, { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import DeleteWarning from "../../shared/components/UIElements/DeleteWarning";
import Image from "../components/Image";
import Theme from "../../shared/components/FormElements/Theme";
import { downloadFile } from "../../shared/util/downloadFile";

const SingleImage = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const userId = auth.userId;

  const imageId = useParams().imageId;
  const [image, setImage] = useState("");
  const [showDelete, setShowWarning] = useState(false);

  const showWarning = () => {
    setShowWarning(true);
  };
  const cancelWarning = () => {
    setShowWarning(false);
  };

  useEffect(() => {
    const getImage = async () => {
      const res = await sendRequest(
        `http://localhost:5000/api/image/${imageId}`,
        "GET",
        null,
        { "Content-Type": "application/json" }
      );
      const image = res.image;
      setImage(image);
    };
    getImage();
  }, [imageId, sendRequest]);

  const upscaleSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/image/upscale/${imageId}`,
        "POST",
        null,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      navigate(`/image/${imageId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}></ErrorModal>
      {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
      <Card className="general-container">
        <Card style={{ width: 500 * (image.width / image.height) || 500, padding: "0px"}}>
          <h2>{image.name}</h2>
          <Image
            width={500 * (image.width / image.height) || 500}
            height={500}
            base64={image.base64}
            imgName={image.name}
            className="single-img"
            imgId={image._id}
          ></Image>
          <br></br>
          <br></br>
          <Card className="action-container top">
            {image.creator && (
              <div className="creator-div">{image.creator.name}</div>
            )}
            {image && (
              <Button size="small" inverse onClick={() => downloadFile("image.png", image.base64)}>
                DOWNLOAD
              </Button>
            )}
          </Card>
          <Card className="action-container">
            <Theme
            name={image.style}
            id={image.style}
            className="item-cont-display"
            key={image.style}
            item={image.style}
            ></Theme>
            {image.colors &&
              image.colors.map((color, index) => {
                return (
                  <Theme
                    name={color}
                    id={color}
                    className="item-cont-display"
                    key={index}
                    item={color}
                  ></Theme>
                );
              })}
            {image.themes &&
              image.themes.map((theme, index) => {
                return (
                  <Theme
                    name={theme}
                    id={theme}
                    className="item-cont-display"
                    key={index}
                    item={theme}
                  ></Theme>
                );
              })}
          </Card>
          {image.creator && image.creator._id === userId && (
            <Card className="action-container">
              <DeleteWarning
                show={showDelete}
                cancel={cancelWarning}
                imgId={image._id}
                type="image"
              ></DeleteWarning>
              <Button size="small" to={`/image/correct/${image._id}`}>CORRECT</Button>
              <form onSubmit={upscaleSubmitHandler}>
                <Button size="small" type="submit">UPSCALE</Button>
              </form>
              <Button size="small" to={`/image/mask/${image._id}`}>MASK</Button>
              <Button danger inverse onClick={showWarning} size="small">
                DELETE
              </Button>
            </Card>
          )}
        </Card>
      </Card>
    </React.Fragment>
  );
};

export default SingleImage;
