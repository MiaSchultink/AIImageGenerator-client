import React, { useCallback, useContext, useEffect, useState } from "react";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { json, useNavigate } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hooks";
import ToggleSwitch from "../../shared/components/FormElements/ToggleSwitch";
import FormSection from "../../shared/components/FormElements/FormSection";
import "./NewImage.css";
import DropDown from "../../shared/components/FormElements/DropDown";
import Theme from "../../shared/components/FormElements/Theme";
import { colors } from "../../shared/util/colors";
import { themes } from "../../shared/util/themes";
import { aspects } from "../../shared/util/aspects";
import { styles } from "../../shared/util/styles";
import FileInput from "../../shared/components/FormElements/FileInput";

const NewImage = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [themesSelected, setThemesSelected] = useState([]);
  const [colorsSelected, setColorsSelected] = useState([]);
  const [published, setPublished] = useState(false);
  const [uploadedImage, setUploadedImage] = useState();

  useEffect(() => {
    console.log(colorsSelected);
  }, [colorsSelected]);

  useEffect(() => {
    console.log(themesSelected);
  }, [themesSelected]);

  const [formState, inputHandler, setFormData, selectHandler] = useForm(
    {
      imageName: {
        value: "",
        isValid: false,
      },
      imagePrompt: {
        value: "",
        isValid: false,
      },
      colors: {
        value: [],
        isValid: false,
      },
      themes: {
        value: [],
        isValid: false,
      },
      published: {
        value: false,
        isValid: true,
      },
    },
    false,
    {
      aspectRatio: {
        value: "",
        isValid: false,
      },
      style: {
        value: "",
        isValid: false,
      },
    }
  );

  const themeChangeHandler = (newTheme) => {
    if (!themesSelected.includes(newTheme) || themesSelected.length === 0) {
      setThemesSelected((prevThemes) => [...prevThemes, newTheme]);
    } else {
      setThemesSelected((prevThemes) => {
        return prevThemes.filter((theme) => theme != newTheme);
      });
    }
  };

  const handleFileUpload = useCallback((event) => {
    // let reader = new FileReader()
    // reader.readAsDataURL(event.target.files[0])
    // reader.onload = () => {
    //  setUploadedImage(reader.result)
    event.preventDefault();
    const fileOject = event.target.files[0];
    setUploadedImage(fileOject);
  }, []);

  const colorChangeHandler = (newColor) => {
    if (!colorsSelected.includes(newColor) || colorsSelected.length === 0) {
      setColorsSelected((prevColors) => [...prevColors, newColor]);
    } else {
      setColorsSelected((prevColors) => {
        return prevColors.filter((color) => color != newColor);
      });
    }
  };

  const publishHandler = (newValue) => {
    if (newValue === "on") {
      setPublished(true);
    } else {
      setPublished(false);
    }
  };

  
  const submitHandler = (event) =>{
    event.preventDefault()
    if (uploadedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileString = reader.result; // String representation of the file object
        sendToServer(fileString);
      };
      reader.readAsDataURL(uploadedImage);
    }
  }

  const sendToServer = async (stringFile) => {
    try {
      console.log("submited image", stringFile);
      const body = JSON.stringify({
        imageName: formState.inputs.imageName.value,
        imagePrompt: formState.inputs.imagePrompt.value,
        aspectRatio: formState.selects.aspectRatio.value,
        colors: colorsSelected,
        themes: themesSelected,
        style: formState.selects.style.value,
        uploadedImage: stringFile,
        published: published,
      });

      try {
        await sendRequest("/image/new", "POST", body, {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        });
        navigate('/image/library')
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}></ErrorModal>
      {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
      <Card className="general-container">
        <Card>
          <h2>New Image</h2>
          <form onSubmit={submitHandler}>
            {console.log("image", uploadedImage)}
            <Input
              element="input"
              key="imageName"
              type="text"
              name="imageName"
              id="imageName"
              label="Image Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText={"Please enter a valid name"}
              onInput={inputHandler}
              placeholder="Image of horse"
            ></Input>
            <Input
              key="imagePrompt"
              type="text"
              name="imagePrompt"
              id="imagePrompt"
              label="Image Prompt"
              validators={[VALIDATOR_REQUIRE()]}
              errorText={"Please enter a valid prompt"}
              onInput={inputHandler}
              placeholder="Image of a european forest during daylight in the winter"
            ></Input>
            <input
              type="file"
              name="uploadedImage"
              id="uploadedImage"
              onChange={handleFileUpload}
              accept="image/png, image/jpeg"
            ></input>
            <FormSection>
              <DropDown
                id="style"
                name="style"
                label="Style"
                options={styles}
                onSelect={selectHandler}
                defVal="photographic"
              ></DropDown>
            </FormSection>
            <FormSection>
              <DropDown
                options={aspects}
                name="aspectRatio"
                id="aspectRatio"
                label="Aspect Ratio"
                defVal="1X1"
                onSelect={selectHandler}
              ></DropDown>
            </FormSection>
            <FormSection>
              <div className="label">Colors</div>
              {colors.map((col, index) => {
                return (
                  <Theme
                    item={col}
                    key={index}
                    className={
                      !colorsSelected.includes(col) ||
                      colorsSelected.length === 0
                        ? "item-cont"
                        : "item-cont-clicked"
                    }
                    onClick={() => colorChangeHandler(col)}
                  ></Theme>
                );
              })}
            </FormSection>
            <FormSection>
              <div className="label">Style</div>
              {themes.map((theme, index) => {
                return (
                  <Theme
                    item={theme}
                    key={index}
                    className={
                      !themesSelected.includes(theme) ||
                      themesSelected.length === 0
                        ? "item-cont"
                        : "item-cont-clicked"
                    }
                    onClick={() => themeChangeHandler(theme)}
                  ></Theme>
                );
              })}
            </FormSection>
            <FormSection>
              <ToggleSwitch
                changeToggleValue={publishHandler}
                name="published"
                id="published"
                on={false}
                label="Publish"
              ></ToggleSwitch>
            </FormSection>
            <FormSection>
              <Button type="submit">GENERATE IMAGE</Button>
            </FormSection>
          </form>
        </Card>
      </Card>
    </React.Fragment>
  );
};

export default NewImage;
