import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Error from "./errors/pages/Error";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Auth from "./user/Auth";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import Home from "./Home/pages/Home";
import NewImage from "./images/pages/NewImage";
import ImageLibrary from "./images/pages/ImageLibrary";
import SingleImage from "./images/pages/SingleImage";
import EditImage from "./images/pages/EditImage";
import UserProfile from "./user/UserProfile";
import ResetPassword from "./user/ResetPassword.js";
import NewPassword from "./user/NewPassword";

function App() {
  const { token, login, logout, userId } = useAuth();
  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/" exact element={<Home></Home>}></Route>
        <Route path="/image/new" exact element={<NewImage></NewImage>}></Route>
        <Route
          path="/image/library"
          exact
          element={<ImageLibrary></ImageLibrary>}
        ></Route>
        <Route
          path="/image/:imageId"
          exact
          element={<SingleImage></SingleImage>}
        ></Route>
        <Route
          path="/image/correct/:imageId"
          exact
          element={<EditImage></EditImage>}
        ></Route>
        <Route
          path="/user/profile"
          exact
          element={<UserProfile></UserProfile>}
        ></Route>
        <Route
          path="/user/reset"
          exact
          element={<ResetPassword></ResetPassword>}
        ></Route>
         <Route
          path="/user/new-password/:token"
          exact
          element={<NewPassword></NewPassword>}
        ></Route>
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" exact element={<Home></Home>}></Route>
        <Route
          path="/image/library"
          exact
          element={<ImageLibrary></ImageLibrary>}
        ></Route>
        <Route path="/user/auth" exact element={<Auth></Auth>}></Route>
        <Route
          path="/image/library"
          exact
          element={<ImageLibrary></ImageLibrary>}
        ></Route>
        <Route
          path="/user/reset"
          exact
          element={<ResetPassword></ResetPassword>}
        ></Route>
        <Route
          path="/user/new-password/:token"
          exact
          element={<NewPassword></NewPassword>}
        ></Route>
      </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation></MainNavigation>
        <main>
          <Routes>
            {routes}
            <Route
              path="*"
              element={
                <Error
                  message="Sorry, we could not find this page."
                  code={404}
                ></Error>
              }
            ></Route>
          </Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
