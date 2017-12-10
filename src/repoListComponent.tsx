import * as React from "react";
import GitRestClient = require("TFS/VersionControl/GitRestClient");
import { GitRepository } from "vso-node-api/interfaces/TfvcInterfaces";
import { WebContext } from "VSS/Common/Contracts/Platform";
// tslint:disable-next-line:no-var-requires
const appStyle =  require("./../scss/application.scss");

interface IRepoListState {
  repoList: GitRepository[];
}

export class RepositoryList extends React.Component<any, IRepoListState> {

  private gitRestClient: GitRestClient.GitHttpClient4;
  private titles: string[];

  public constructor(props) {
    super(props);
    this.gitRestClient =  GitRestClient.getClient();
    this.state = { repoList: []};
    this.titles = ["name", "id"];
  }

  public componentWillMount() {
    this.gitRestClient.getRepositories(VSS.getWebContext().project.id).then((repos: GitRepository[]) => {
      this.setState({repoList: repos});
    });
  }
  public render() {
    return (
      <table className={appStyle.element}>
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
              <td>{row.name}</td>,
              <td>{row.id}</td>,
            </tr>,
          )}
        </tbody>
      </table>
    );
  }

}
