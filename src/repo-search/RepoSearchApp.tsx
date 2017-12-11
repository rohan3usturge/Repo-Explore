import * as React from "react";
import * as ReactDOM from "react-dom";
import {RepositoryList} from "./repoListComponent";

export class RepoSearchApp {
  constructor() {}

  private run = (): void => {
    ReactDOM.render(
      <RepositoryList/>, document.getElementById("repo-search-container"));
  }
}
