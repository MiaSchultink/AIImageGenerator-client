import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../shared/hooks/http-hook";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import Button from "../shared/components/FormElements/Button";
import Card from "../shared/components/UIElements/Card";
import { AuthContext } from "../shared/context/auth-context";
import Input from "../shared/components/FormElements/Input";
import { VALIDATOR_EMAIL } from "../shared/util/validators";
import { useForm } from "../shared/hooks/form-hooks";

const ResetPassword = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [requested, setRequested] = useState(false);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest("/users/reset", "POST", JSON.stringify({email: formState.inputs.email.value}), {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      });
      setRequested(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
      <ErrorModal error={error} onClear={clearError}></ErrorModal>
      <Card className="general-container">
        <Card>
          <h2>{!requested ? "Reset password" : "Reset Requested"}</h2>
          {requested && <div>Didn't get an email?</div>}
          <form onSubmit={submitHandler}>
            <Input
              element="input"
              id="email"
              type="email"
              label="E-Mail"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email address."
              onInput={inputHandler}
              placeholder="example@gmail.com"
            />
            <Button type="submit">{requested ? "RETRY" : "RESET"}</Button>
          </form>
        </Card>
      </Card>
    </React.Fragment>
  );
};

export default ResetPassword;
