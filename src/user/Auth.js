import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../shared/components/UIElements/Card";
import Input from "../shared/components/FormElements/Input";
import Button from "../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../shared/util/validators";
import { useForm } from "../shared/hooks/form-hooks";
import { AuthContext } from "../shared/context/auth-context";
import "./Auth.css";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../shared/hooks/http-hook";
import DropDown from "../shared/components/FormElements/DropDown";

const Auth = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData, selectHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false,
        {
          ...formState.selects,
          plan: {
            value: "",
            isValid: false,
          },
        }
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.userId, responseData.token);
        navigate("/image/library");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const responseData = await sendRequest(
          "/users/signup",
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            plan: formState.selects.plan.value
          }),
          {
            "Content-Type": "application/json",
          }
        );

        auth.login(responseData.userId);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}></ErrorModal>
      <Card className="general-container">
        <Card className="authentication">
          {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
          {isLoginMode ? <h2>Login</h2> : <h2>Sign Up</h2>}
          <form onSubmit={authSubmitHandler}>
            {!isLoginMode && (
              <Input
                element="input"
                id="name"
                type="text"
                label="Your Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={inputHandler}
                placeholder="John Doe"
              />
            )}
            {!isLoginMode && (
              <DropDown
                id="plan"
                name="subscription"
                options={["Free", "Premium"]}
                defVal="Free"
                label="Plan"
                onSelect={selectHandler}
              ></DropDown>
            )}
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
            <Input
              element="input"
              id="password"
              type="password"
              label="Password"
              validators={[VALIDATOR_MINLENGTH(6)]}
              errorText="Please enter a valid password, at least 6 characters."
              onInput={inputHandler}
              placeholder="At least 6 characters"
            />
            <div className="form-btn-cont" style={{ marginBottom: "10px" }}>
              <Button type="submit" disabled={!formState.isValid}>
                {isLoginMode ? "LOGIN" : "SIGNUP"}
              </Button>
              {isLoginMode && <Button to="/user/reset">RESET PASSWORD</Button>}
            </div>
          </form>
          <Button inverse onClick={switchModeHandler}>
            {isLoginMode ? "SIGNUP" : "LOGIN"}
          </Button>
        </Card>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
