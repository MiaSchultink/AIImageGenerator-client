import React, { useEffect, useState, useContext } from "react";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../shared/context/auth-context";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import Card from "../shared/components/UIElements/Card";
import "./UserProfile.css";
import ImageList from "../images/components/ImageList";
import Button from "../shared/components/FormElements/Button";
import DeleteWarning from "../shared/components/UIElements/DeleteWarning";

const UserProfile = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const userId = auth.userId;
  const [user, setUser] = useState();
  const [showDelete, setShowWarning] = useState(false);

  const showWarning = () => {
    setShowWarning(true);
  };
  const cancelWarning = () => {
    setShowWarning(false);
  };

  useEffect(() => {
    const getUser = async () => {
      const response = await sendRequest(
        `/users/${userId}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      setUser(response.user);
    };
    getUser();
  }, [userId, sendRequest]);

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
      <ErrorModal error={error} onClear={clearError}></ErrorModal>
      {user && (
        <Card style={{ width: "100vw" }}>
          <div className="user-dets">
            {user.name && <div className="user-name">{user.name}</div>}
            {user.email && <div className="user-det">{user.email}</div>}
            {user.plan && <div className="user-det">{user.plan}</div>}
          </div>
          {user.images && (
            <div className="images-container">
              <ImageList images={user.images}></ImageList>
            </div>
          )}
          <Button to="/user/edit-profile">EDIT</Button>
          <DeleteWarning
            show={showDelete}
            cancel={cancelWarning}
            type="user"
          ></DeleteWarning>
          <Button danger inverse onClick={showWarning}>
            DELETE
          </Button>
        </Card>
      )}
    </React.Fragment>
  );
};

export default UserProfile;
