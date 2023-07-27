import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useHttpClient } from "../shared/hooks/http-hook";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../shared/util/validators";
import { AuthContext } from "../shared/context/auth-context";
import { useForm } from "../shared/hooks/form-hooks";
import Card from "../shared/components/UIElements/Card";
import Input from "../shared/components/FormElements/Input";
import Button from "../shared/components/FormElements/Button";

const NewPassword = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const token = useParams().token;
  const [userId, setUserId] = useState();

  const [formState, inputHandler, setFormData] = useForm(
    {
      newPassword: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const getUser = async () => {
      try {
        const responseData =await sendRequest(
          `/users/new-password/${token}`,
          "GET",
          null,
          { "Content-Type": "application/json" }
        );
        setUserId(responseData.user._id)
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [token, sendRequest]); 
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `/users/new-password/${token}`,
        "POST",
        JSON.stringify({
          password: formState.inputs.newPassword.value,
          passwordToken: token,
          userId: userId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      navigate("/image/library");
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
          <form onSubmit={submitHandler}>
            <Input
              element="input"
              key="newPasword"
              type="password"
              name="newPassword"
              id="newPassword"
              label="New Password"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
              errorText={"Please enter a valid password"}
              onInput={inputHandler}
              placeholder="Your password"
            ></Input>
            <Button type="submit">RESET</Button>
          </form>
        </Card>
      </Card>
    </React.Fragment>
  );
};

export default NewPassword;
