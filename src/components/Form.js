import React from "react";
import BackEnd from "../api/BackEnd";
import FormItem from "./FormItem";

class Form extends React.Component {
  /*
  Values correspond au valeurs rentrées par l'utilisateur dans le formulaire 
  Occurences correspond aux types des variables dans leur ordre d'apparition
  Le state contient var: string contenant les variables et leurs types et conctractId l'id du contrat
  */
  values = [];
  occurences = [];
  constructor(props) {
    super(props);
    this.state = { var: {}, contractId: null, pdf: null };
  }
  componentDidMount() {
    this.onFormLoad();
  }

  /*
  Removing every white space from state.var string allows easier string manipulation
  */
  onFormLoad = async () => {
    const response = await BackEnd.get(
      `/form/${this.props.location.state.contract}`
    );
    this.setState({
      var: JSON.parse(response.data).var.replace(/ /g, ""),
      contractId: JSON.parse(response.data).idContrat
    });
    console.log(this.state.var);
  };

  parentCallback = (value, id) => {
    this.values[id] = value;
  };

  /*
  var est sous la forme suivante : "status":"texte","another":"number"
  vars est un array sous forme : ["status":"texte","another":"number"]
  */
  splitVariable() {
    const vars = this.state.var.split(",");
    return vars.map((e, index) => {
      let field = e.replace(/"/g, "").split(":");
      this.occurences[index] = field[1];
      return (
        <FormItem
          key={index}
          id={index}
          name={field[0]}
          type={field[1]}
          sendToParent={this.parentCallback}
        />
      );
    });
  }

  buildVariable = async () => {
    let newvar = this.state.var;
    this.occurences.forEach((occ, index) => {
      newvar = newvar.replace(`:"${occ}"`, `:"${this.values[index]}"`);
    });
    const response = await BackEnd.post(
      `/form/${this.props.location.state.contract}`,
      newvar
    );
    //console.log(newvar);
    console.log(response);
    //this.props.history.push(`/pdf/${response.data}`);
    //this.setState({ pdf: response.data });
  };

  render() {
    if (this.state.contractId) {
      if (this.state.var.length !== 0) {
        return (
          <div>
            <h1>Formulaire</h1>
            Form id : {this.props.location.state.contract}
            <form>{this.splitVariable()}</form>
            <button className="ui button primary" onClick={this.buildVariable}>
              Generer PDF
            </button>
          </div>
        );
      } else {
        return (
          <div>
            <h1>Formulaire</h1>
            Form id : {this.props.location.state.contract}
            <div>There are no variables.</div>
          </div>
        );
      }
    } else {
      return (
        <div>
          <h1>Formulaire</h1>
          Form id : {this.props.location.state.contract}
          <div>Fetching variables, please wait...</div>
        </div>
      );
    }
  }
}

export default Form;
