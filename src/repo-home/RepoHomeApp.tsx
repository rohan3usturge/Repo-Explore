import * as React from "react";
import * as ReactDOM from "react-dom";
import {RepoHomeComponent} from "./RepoHomeComponent";

export class RepoHomeApp {

    constructor() {}

    private run = (): void => {
        ReactDOM.render(
            <RepoHomeComponent/>, document.getElementById("repo-home-container"));
    }
}
