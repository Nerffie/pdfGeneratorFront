import React from "react";

class FormItem extends React.Component {
  state = { value: "" };
  onInputChange = e => {
    //Add a onChange on every input so that form gets the data from its children(Form -> FormItem)
    e.preventDefault();
    //this.setState({ value: e.target.value });
    //console.log(e.target.value);
    this.props.sendToParent(e.target.value, this.props.id);
  };

  render() {
    const { type, name } = this.props;
    //console.log(type);
    //console.log(typeof type);
    switch (type) {
      case "date":
        return (
          <div>
            <label>{name} : </label>
            <input type="date" onChange={this.onInputChange}></input>
          </div>
        );
      case "number":
        return (
          <div>
            <label>{this.props.name} : </label>
            <input type="number" onChange={this.onInputChange}></input>
          </div>
        );
      default:
        return (
          <div>
            <label>{this.props.name} : </label>
            <input type="text" onChange={this.onInputChange}></input>
          </div>
        );
    }
  }
}

export default FormItem;
