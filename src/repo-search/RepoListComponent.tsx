import * as React from "react";
import GitRestClient = require("TFS/VersionControl/GitRestClient");
import { GitRepository } from "vso-node-api/interfaces/TfvcInterfaces";
import { WebContext } from "VSS/Common/Contracts/Platform";
import * as suTableStyle from "./../../semantic/dist/components/table.css";

interface IRepoListState {
  repoList: GitRepository[];
}

export class RepositoryList extends React.Component<any, IRepoListState> {

  private gitRestClient: GitRestClient.GitHttpClient4;
  private titles: string[];
  private className: string;
  private repoName: string;

  public constructor(props) {
    super(props);
    this.gitRestClient =  GitRestClient.getClient();
    this.state = { repoList: []};
    this.titles = ["name", "id"];
    this.className = suTableStyle.ui + " " + suTableStyle.celled + " " + suTableStyle.table;
  }

  public componentWillMount() {
    this.gitRestClient.getRepositories(VSS.getWebContext().project.id).then((repos: GitRepository[]) => {
      this.setState({repoList: repos});
    });
  }
  public render() {
    return (
      <table className={this.className}>
        <thead>
          <tr>
            {this.titles.map((title) =>
              <th key={title}>{title}</th>,
            )}
          </tr>
        </thead>
        <tbody>
          {this.state.repoList.map((row: GitRepository, i) =>
            <tr key={i}>
              <td>{row.name}</td>
              <td>{row.id}</td>
            </tr>,
          )}
        </tbody>
      </table>
    );
  }

}
