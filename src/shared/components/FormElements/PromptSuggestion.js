import React, { useContext, useState } from "react";
import { useForm } from "../../hooks/form-hooks";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";
import Button from "./Button";
import Input from "./Input";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import ErrorModal from "../UIElements/ErrorModal";

const PromptSuggestion = (props) => {
  const [generatedSuggestion, setGeneratedSuggestion] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [formState2, inputHandler2] = useForm(
    {
      userPrompt: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const { sendDataToParent } = props;

  const suggestionSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (formState2.inputs.userPrompt && formState2.inputs.userPrompt !== "") {
        const responseData = await sendRequest(
          "/image/suggest-prompt",
          "POST",
          JSON.stringify({ userPrompt: formState2.inputs.userPrompt }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        setGeneratedSuggestion(responseData.suggestion);
        sendDataToParent(responseData.suggestion);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onClickHandler = (event) =>{
    event.preventDefault();
    setGeneratedSuggestion(event.target.value)
  }

  return (
    <React.Fragment>
      {generatedSuggestion && (
        <React.Fragment>
          <div>{generatedSuggestion}</div>
          <Button onClick={props.useSuggestion}>Use suggestion</Button>
        </React.Fragment>
      )}
      {!generatedSuggestion && (
        <form onSubmit={suggestionSubmitHandler}>
          <Input
            key="userPrompt"
            type="text"
            sublabel="[optional]"
            name="userPrompt"
            id="userPrompt"
            label="Key words or short prompt"
            validators={[]}
            errorText={"Please enter a valid prompt"}
            onInput={inputHandler2}
            placeholder="Girl walking on street, blue, night, buildings"
          ></Input>
          <Button size="small" type="submit">
            GET SUGGESTION
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default PromptSuggestion;
