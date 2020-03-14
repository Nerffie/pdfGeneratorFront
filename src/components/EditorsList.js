import React from "react";
import BackEnd from "../api/BackEnd";
import Contract from "./Contract";

class EditorsList extends React.Component {
  state = { contracts: [] };

  onPageLoad = async () => {
    const response = await BackEnd.get("/models");
    //console.log(response.data);
    this.setState({ contracts: JSON.parse(response.data) });
  };

  componentDidMount() {
    this.onPageLoad();
  }

  renderContracts() {
    const contracts = this.state.contracts.map(contract => {
      return <Contract key={contract.id} contract={contract} />;
    });
    return contracts;
  }
  render() {
    if (!this.state.contracts.length) {
      return (
        <div className="segment">
          <h1 className="ui header">Liste des modèles</h1>
          <div className="ui active inverted dimmer">
            <div className="ui large text loader">
              Récupération des modèles...
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1 className="ui header">Liste des modèles</h1>
          <div className="ui middle aligned divided list">
            {this.renderContracts()}
          </div>
        </div>
      );
    }
  }
}

export default EditorsList;
