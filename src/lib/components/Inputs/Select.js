import React, { Component } from 'react';

class Select extends Component {

  constructor(props) {
    super(props);
    this.renderOptions = this.renderOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <select className={'form-select ' + this.props.customClassName}
              name={this.props.name}
              value={this.props.value}
              onChange={(event) => this.handleChange(event)}
              multiple={this.props.multiple}>
        {(this.props.multiple || this.props.noDefault) ? null : <option value={this.props.defaultVal}>{this.props.defaultText}</option>}
        {this.renderOptions()}
      </select>
    )
  }

  renderOptions() {
    let items = [];
    for(let option of this.props.options) {
      items.push(<option key={'option-' + option.value} value={option.value}>{option.text}</option>);
    }
    return items;
  }

  handleChange(event) {
    let { target } = event;
    if(this.props.multiple) {
      let val = [...this.props.value];
      let index = val.indexOf(target.value);
      if (index !== -1) {
        val.splice(index, 1);
      } else {
        val.push(target.value);
      }
      this.props.onChange({
        updated: {
          [target.name]: val
        },
        name: target.name,
        event: event,
        target: target,
        value: val
      });
    } else {
      this.props.onChange({
        updated: {
          [target.name]: target.value
        },
        name: target.name,
        event: event,
        target: target,
        value: target.value
      })
    }
  }
}

Select.defaultProps = {
  customClassName: '',
  attachOnChange: true,
  defaultText: 'Select an Option'
};


export default Select;
