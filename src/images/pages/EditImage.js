import React, { useEffect, useContext, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Image from "../components/Image";
import FormSection from "../../shared/components/FormElements/FormSection";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hooks";
import ToggleSwitch from "../../shared/components/FormElements/ToggleSwitch";
import Card from "../../shared/components/UIElements/Card";

const EditImage = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const userId = auth.userId;
  const imageId = useParams().imageId;
  const [image, setImage] = useState("");

  useEffect(() => {
    const getImage = async () => {
      const response = await sendRequest(
        `http://localhost:5000/api/image/${imageId}`,
        "GET",
        null,
        { "Content-Type": "application/json" }
      );
      setImage(response.image);
      console.log(response.image);
    };
    getImage();
  }, [imageId, sendRequest]);

  const [formState, inputHandler, setFormData] = useForm({
    correctingInfo: {
      value: "",
      isValid: false,
    }
  });

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/image/correct/${imageId}`,
        "POST",
        JSON.stringify({
          correctingInfo: formState.inputs.correctingInfo.value,
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
      {image.name && image.published && (
        <form onSubmit={submitHandler}>
          <Card className="general-container">
            <Card>
              <FormSection>
                <Image
                  height="200px"
                  width="200px"
                  base64={image.base64}
                ></Image>
              </FormSection>
              <Input
                key="correctingInfo"
                type="text"
                name="correctingInfo"
                id="correctingInfo"
                label="Correcting Info"
                validators={[VALIDATOR_REQUIRE()]}
                errorText={"Please enter a valid prompt"}
                onInput={inputHandler}
                placeholder="An image of 3 people in a meeting room overlooking the city in broad daylight"
              ></Input>
              <FormSection>
                <Button type="submit">REGENERATE</Button>
              </FormSection>
            </Card>
          </Card>
        </form>
      )}
    </React.Fragment>
  );
};
export default EditImage;
