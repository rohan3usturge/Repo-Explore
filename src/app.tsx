import * as React from "react";
import * as ReactDOM from "react-dom";
import { RepositoryList } from "./repoListComponent";

export class Main {
  constructor() {
    this.run();
  }

  private run = (): void => {
    ReactDOM.render(
      <RepositoryList />,
      document.getElementById("rohan-container"),
    );
  }
}
