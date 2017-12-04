import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validateOutOfForm } from '../Helpers/formUtils';


class Select extends Component {

  constructor(props) {
    super(props);
    this.renderOptions = this.renderOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    let style = {};
    if(this.props.size) {
      style.width = (100/this.props.size) +'%';
    }
    return (
      <select className={'form-select ' + (this.props.multiple ? 'multi-select ' : '') + this.props.customClassName}
              name={this.props.name}
              value={this.props.value}
              onChange={(event) => this.handleChange(event)}
              multiple={this.props.multiple}
              style={style}>
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
  defaultText: 'Select an Option',
  emptyValue: '',
  defaultVal: ''
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  value: (props, propname, component) => validateOutOfForm(props, propname, component, 'String'),
  onChange: (props, propname, component) => validateOutOfForm(props, propname, component, 'Function'),
  emptyValue: PropTypes.string.isRequired,
  defaultVal: (props, propname, component) => {
      if(!props.noDefault && !props.defualtVal && props.defaultVal !== '')
        return new Error('You must supply defaultVal unless noDefault is passed in ' + component);
  },
  defaultText: (props, propname, component) => {
    if(!props.noDefault && (!props.defaultText || props.defaultText.constructor.name !== 'String'))
      return new Error('You must supply defaultText as a string unless noDefault is passed in ' + component);
  },
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    text: PropTypes.string.isRequired
  })).isRequired,

  customClassName: PropTypes.string,
  multiple: PropTypes.bool,
  noDefault: PropTypes.bool,
  attachOnChange: PropTypes.bool
};


export default Select;
