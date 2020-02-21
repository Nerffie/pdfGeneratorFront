import React from "react";
import BackEnd from "../api/BackEnd";
import FormItem from "./FormItem";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { var: {}, contractId: null, values: [] };
  }

  componentDidMount() {
    this.onFormLoad();
  }

  onFormLoad = async () => {
    const response = await BackEnd.get(
      `/form/${this.props.location.state.contract}`
    );
    this.setState({
      var: JSON.parse(response.data).var,
      contractId: JSON.parse(response.data).idContrat
    });
  };

  parentCallback(value, id) {
    let values = [...this.state.values]; // create the copy of state array
    values[id] = value; //new value
    this.setState({ values });
  }

  splitVariable() {
    const vars = this.state.var.split(",");
    let i = -1;
    return vars.map(e => {
      let field = e.replace(/"/g, "").split(":");
      i++;
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

  render() {
    if (this.state.contractId) {
      if (this.state.var.length !== 0) {
        return (
          <div>
            Form id : {this.props.location.state.contract}
            <div>{this.splitVariable()}</div>
            <button className="ui button primary">Generer PDF</button>
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
