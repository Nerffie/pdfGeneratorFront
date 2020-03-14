import React from "react";

class FormItem extends React.Component {
  state = { value: "" };
  onInputChange = e => {
    //Add a onChange on every input so that form gets the data from its children(Form -> FormItem)
    e.preventDefault();
    this.props.sendToParent(e.target.value, this.props.id);
  };

  render() {
    const { type, name } = this.props;
    const nameUppercase = name.charAt(0).toUpperCase() + name.slice(1);
    const inputType = type === "date" || type === "number" ? type : "text";

    return (
      <div className="field">
        <label>{nameUppercase}</label>
        <input
          type={inputType}
          onChange={this.onInputChange}
          placeholder={nameUppercase}
        ></input>
      </div>
    );
  }
}

export default FormItem;
