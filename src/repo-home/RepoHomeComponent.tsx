import * as React from "react";
import * as Showdown from "showdown";
import { TextDecoder } from "text-encoding";
import GitRestClient = require("TFS/VersionControl/GitRestClient");
import { GitRepository } from "vso-node-api/interfaces/TfvcInterfaces";

export interface IRepoHomeComponentProps {
    dummy: string;
}

export interface IRepoHomeComponentState {
    content: string;
}

export class RepoHomeComponent extends React.Component < any, IRepoHomeComponentState > {

    private gitRestClient: GitRestClient.GitHttpClient4;
    private repoName: string;
    private converter: Showdown.Converter;
    private decoder: TextDecoder;

    public constructor(props) {
        super(props);
        this.gitRestClient = GitRestClient.getClient();
        this.repoName = $(".selected-item-text").text();
        this.converter = new Showdown.Converter();
        this.decoder = new TextDecoder();
    }

    public componentWillMount(): void {
        this.getReadMeContent()
        .then((content) => {
            const strContent = this.converter.makeHtml(this.decoder.decode(content));
            this.setState({content: strContent});
        });
    }

    public render() {
        return (
            <p>{this.state.content}</p>
        );
    }

    private getReadMeContent = (): PromiseLike<ArrayBuffer> => {
        return this.gitRestClient.getRepository(this.repoName)
        .then((repo: GitRepository) => this.gitRestClient.getItemContent(repo.id, "readme.md"));
    }
}
