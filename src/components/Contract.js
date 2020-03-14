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
        <div className="right floated content">
          <Link
            to={{
              pathname: pathToEditor,
              state: { oldEditorContent: this.props.contract.ops }
            }}
          >
            <div className="ui button olive">
              <i className="edit icon"></i>Éditer
            </div>
          </Link>
          <Link
            to={{
              pathname: pathToForm,
              state: { contract: this.props.contract.id }
            }}
          >
            <div className="ui button brown">
              <i className="linkify icon"></i>Générer formulaire
            </div>
          </Link>
        </div>
        <div className="content">
          <div>
            <span className="ui header violet">Modèle id :</span>
            <span className="description">{this.props.contract.id}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Contract;
