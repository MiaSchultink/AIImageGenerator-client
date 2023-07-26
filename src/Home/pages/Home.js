import React from "react";
import GoToContent from "../components/GoToContent";
import Card from "../../shared/components/UIElements/Card";

const Home = () => {

  return (
    <React.Fragment>
      <Card
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          padding: "10px",
          flexWrap: "wrap",
        }}>
          <h2>Hello</h2>
      </Card>
    </React.Fragment>
  );
};

export default Home;
