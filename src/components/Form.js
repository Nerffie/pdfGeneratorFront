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
    this.state = { var: {}, contractId: null, pdfReady: false };
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
    const parsedJSON = JSON.parse(response.data);
    this.setState({
      var: parsedJSON.var.replace(/ /g, ""),
      contractId: parsedJSON.idContrat
    });
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

  buildVariable = async e => {
    e.preventDefault();
    let newvar = this.state.var;
    this.occurences.forEach((occ, index) => {
      newvar = newvar.replace(`:"${occ}"`, `:"${this.values[index]}"`);
    });
    this.setState({ pdfReady: true });
    const response = await BackEnd.post(
      `/form/${this.props.location.state.contract}`,
      newvar,
      { responseType: "blob" }
    );
    const file = new Blob([response.data], {
      type: "application/pdf"
    });
    //Build a URL from the file
    const fileURL = URL.createObjectURL(file);
    //Open the URL on new Window
    window.open(fileURL);
    this.props.history.push("/");
  };

  render() {
    if (this.state.contractId) {
      if (this.state.var.length !== 0) {
        if (!this.state.pdfReady) {
          return (
            <div>
              <h1 className="ui header">Formulaire</h1>
              <div className="ui info message">
                <div className="header">
                  Formulaire id : {this.props.location.state.contract}{" "}
                </div>
              </div>

              <form className="ui form">
                {this.splitVariable()}
                <button className="ui button" onClick={this.buildVariable}>
                  <i className="file pdf outline icon"></i>
                  Generer PDF
                </button>
              </form>
            </div>
          );
        } else {
          return (
            <div className="segment">
              <div className="ui active inverted dimmer">
                <div className="ui large text loader">Génération du PDF...</div>
              </div>
            </div>
          );
        }
      } else {
        return (
          <div>
            <h1 className="ui header">Formulaire</h1>
            <div className="ui icon message red">
              <i className="notched times  icon"></i>
              <div className="content">
                <div className="header">Oops !</div>
                <p>Aucune variable n'a été détectée dans ce formulaire.</p>
                <p>Formulaire id : {this.props.location.state.contract}</p>
              </div>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="segment">
          <h1 className="ui header">Formulaire</h1>
          <div className="ui active inverted dimmer">
            <div className="ui large text loader">
              Récupération des variables...
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Form;
