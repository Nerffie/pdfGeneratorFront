import React from "react";

class FormItem extends React.Component {
  onInputChange() {
    //Add a onChange on every input so that form gets the data from its children(Form -> FormItem)
  }

  render() {
    switch (this.props.type) {
      case "date":
        return (
          <div>
            <label>{this.props.name} : </label>
            <input type="date"></input>
          </div>
        );

      case "number":
        return (
          <div>
            <label>{this.props.name} : </label>
            <input type="number"></input>
          </div>
        );
      default:
        return (
          <div>
            <label>{this.props.name} : </label>
            <input type="text"></input>
          </div>
        );
    }
  }
}

export default FormItem;
