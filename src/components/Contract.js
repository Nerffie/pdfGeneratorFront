import React from "react";
import { Link } from "react-router-dom";

class Contract extends React.Component {
  constructor(props) {
    super(props);
    this.variables = {};
  }

  render() {
    const pathToEditor = `editor/id/${this.props.contract.id}`;
    const pathToForm = `form`;
    return (
      <div className="item">
        <div className="content">
          <Link
            to={{
              pathname: pathToEditor,
              state: { oldEditorContent: this.props.contract.ops }
            }}
          >
            Contract : {this.props.contract.id}
          </Link>
        </div>
        <div className="description">
          <Link
            to={{
              pathname: pathToForm,
              state: { contract: this.props.contract.id }
            }}
          >
            <button className="ui button">Generer formulaire</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Contract;
