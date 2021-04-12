import React, { useContext } from "react";

import Ingredients from "./components/Ingredients/Ingredients";
import Auth from "./components/Auth";
import { AuthContext } from "./components/context/AuthContext";

const App = () => {

  const authContext = useContext(AuthContext);
  console.log(authContext.isLogin);

  let context = <Auth />;
  if (authContext.isLogin) {
    context = <Ingredients />;
  }

  return context;
};

export default App;
