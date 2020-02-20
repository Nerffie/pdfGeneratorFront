import React from "react";
import BackEnd from "../api/BackEnd";
import Contract from "./Contract";
import { Link } from "react-router-dom";
class EditorsList extends React.Component {
  state = { contracts: [] };

  onPageLoad = async () => {
    const response = await BackEnd.get("/contracts");
    console.log(response.data);
    console.log(JSON.parse(response.data));
    this.setState({ contracts: JSON.parse(response.data) });
  };

  componentDidMount() {
    this.onPageLoad();
  }

  renderContracts() {
    const contracts = this.state.contracts.map(contract => {
      let path = `editor/id/${contract.id}`;
      return (
        <Link
          key={contract.id}
          to={{ pathname: path, state: { oldEditorContent: contract.ops } }}
        >
          <Contract id={contract.id} />
        </Link>
      );
    });
    return contracts;
  }
  render() {
    if (this.state.contracts === []) {
      return <div>Fetching contracts ...</div>;
    } else {
      return <div>{this.renderContracts()}</div>;
    }
  }
}

export default EditorsList;
