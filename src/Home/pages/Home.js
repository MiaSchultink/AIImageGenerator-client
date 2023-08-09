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
          <GoToContent url="/image/new" backgroundColor="#333638">Create New Image</GoToContent>
          <GoToContent url="/image/library" backgroundColor="#333638">Get Inspiration</GoToContent>
      </Card>
    </React.Fragment>
  );
};

export default Home;
