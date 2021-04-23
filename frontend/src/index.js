import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./state/store";
import operations from "./state/movies/operations";

store.dispatch(operations.getMovies());

ReactDOM.render(
  <React.StrictMode>

    <Provider store={store}>
      <App style={{backgroundColor: "white"}}/>
    </Provider>

  </React.StrictMode>,
  document.getElementById("root")
);
