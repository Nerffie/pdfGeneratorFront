import React from "react";
import BackEnd from "../api/BackEnd";
import FormItem from "./FormItem";

class Form extends React.Component {
  values = [];
  occurences = [];
  constructor(props) {
    super(props);
    this.state = { var: {}, contractId: null };
  }
  componentDidMount() {
    this.onFormLoad();
  }

  onFormLoad = async () => {
    const response = await BackEnd.get(
      `/form/${this.props.location.state.contract}`
    );
    //console.log(response.data);
    //console.log(JSON.parse(response.data));
    this.setState({
      var: JSON.parse(response.data).var,
      contractId: JSON.parse(response.data).idContrat
    });
  };

  parentCallback = (value, id) => {
    this.values[id] = value;
  };

  splitVariable() {
    const vars = this.state.var.split(",");
    let i = -1;
    return vars.map(e => {
      let field = e.replace(/"/g, "").split(": ");
      i++;
      this.occurences[i] = field[1];
      return (
        <FormItem
          key={i}
          id={i}
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
      newvar = newvar.replace(occ, this.values[index]);
    });
    const response = await BackEnd.post(
      `/form/${this.props.location.state.contract}`,
      newvar
    );
    console.log(response);
    //console.log(this.props.history);
    this.props.history.push("/");
  };

  render() {
    if (this.state.contractId) {
      if (this.state.var.length !== 0) {
        return (
          <div>
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
            Form id : {this.props.location.state.contract}
            <div>There are no variables.</div>
          </div>
        );
      }
    } else {
      return (
        <div>
          Form id : {this.props.location.state.contract}
          <div>Fetching variables, please wait...</div>
        </div>
      );
    }
  }
}

export default Form;
