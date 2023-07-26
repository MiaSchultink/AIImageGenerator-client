import React, { useEffect, useState, useContext } from "react";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../shared/context/auth-context";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import Card from "../shared/components/UIElements/Card";
import "./UserProfile.css";
import ImageList from "../images/components/ImageList";

const UserProfile = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const userId = auth.userId;

  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      const response = await sendRequest(
        `http://localhost:5000/api/users/${userId}`,
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
      {user &&
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
      </Card>
      }
    </React.Fragment>
  );
};

export default UserProfile;
