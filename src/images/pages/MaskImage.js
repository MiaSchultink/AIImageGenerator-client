import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hooks";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Image from "../components/Image";

const MaskImage = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const imageId = useParams().imageId;

  const [maskImage, setMaskImage] = useState();
  const [originalImage, setOriginalImage] = useState();

  const [formState, inputHandler, setFormData] = useForm({
    maskPrompt: {
      value: "",
      isValid: false,
    },
  });

  useEffect(() => {
    const getImage = async () => {
      const res = await sendRequest(
        `/image/${imageId}`,
        "GET",
        null,
        { "Content-Type": "application/json" }
      );
      const image = res.image;
      setOriginalImage(image);
    };
    getImage();
  }, [imageId, sendRequest]);

  const fileChangeHandler = async (event) => {
    const file = event.target.files[0];
    setMaskImage(file);
  };

  const maskSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `/image/mask/${imageId}`,
        "POST",
        JSON.stringify({
          maskImage: maskImage,
          maskPrompt: formState.inputs.maskPrompt.value,
        }),
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
      {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
      <ErrorModal error={error} onClear={clearError}></ErrorModal>
      <Card className="genera-container">
        {originalImage && (
          <Card>
            <form onSubmit={maskSubmitHandler}>
              <Image
                base64={originalImage.base64}
                width="200px"
                height="200px"
              ></Image>
              <Input
                key="maskPrompt"
                type="text"
                name="maskPrompt"
                id="maskPrompt"
                label="Masking Prompt"
                validators={[VALIDATOR_REQUIRE()]}
                errorText={"Please enter a valid prompt"}
                onInput={inputHandler}
                placeholder="An image of a sea seen from a clif at sunset"
              ></Input>
              <input
                type="file"
                className="file-input"
                name="maskImage"
                id="maskImage"
                onChange={fileChangeHandler}
              ></input>
              <Button type="submit">MASK</Button>
            </form>
          </Card>
        )}
      </Card>
    </React.Fragment>
  );
};

export default MaskImage;
