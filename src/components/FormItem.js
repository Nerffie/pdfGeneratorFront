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
    const inputType = type === "date" || type === "number" ? type : "text";

    return (
      <div>
        <label>{name} : </label>
        <input type={inputType} onChange={this.onInputChange}></input>
      </div>
    );
  }
}

export default FormItem;
