import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./core/imports.css";
import GlobalStyles from "./core/globalStyles";

import reportWebVitals from "./reportWebVitals";

import { HomeView } from "./app/views/Home.view";
import { NotFoundView } from "./app/views/NotFound";
import { EditorsListView } from "./app/views/EditorsList.view";
import { PostCreateView } from "./app/views/PostCreateView.view";
import { EditorProfileView } from "./app/views/EditorProfile.view";
import { http } from "./core/http";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route component={HomeView} path="/" exact />
        <Route component={EditorsListView} path="/editores" exact />
        <Route component={EditorProfileView} path="/editores/:id" exact />
        <Route component={PostCreateView} path="/posts/criar" exact />
        <Route component={NotFoundView} />
      </Switch>
    </BrowserRouter>
    <GlobalStyles />
  </React.StrictMode>,
  document.getElementById("root")
);

async function getDataFromApi() {
  try {
    const response = await http.get("/posts");
    const posts = response.data;
    console.log(posts);
  } catch (error) {
    console.log(`Houve um erro: ${error.message}`);
  }
}

getDataFromApi();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
