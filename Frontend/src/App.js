import React from "react";
import "./App.css";
import UserData from "./components/UserData";
import { Provider } from "react-redux";
import store from "./redux/dataStore";
function App() {
  return (
    <>
      <Provider store={store}>
        <UserData />
      </Provider>
    </>
  );
}

export default App;
