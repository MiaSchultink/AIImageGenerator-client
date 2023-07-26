import React, { useState } from "react";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../shared/context/auth-context";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import { useForm } from "../shared/hooks/form-hooks";

const EditUserProfile = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [user, setUser] = useState();
  const userId = auth.userId;

  useEffect(() => {
    const getUser = async () => {
      const response = await sendRequest(
        "http://localhost:5000/api/user/profile",
        "GET",
        null,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setUser(response.user);
    };
    // getUser();
  }, [userId, sendRequest]);

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}></ErrorModal>
      {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
      <form>
        <Card className="genral-container">
          <Card>
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
          </Card>
        </Card>
      </form>
    </React.Fragment>
  );
};

export default EditUserProfile;
