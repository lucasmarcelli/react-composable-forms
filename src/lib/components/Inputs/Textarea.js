import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validateOutOfForm } from '../Helpers/formUtils';


class Textarea extends Component {

  render() {
    return (
      <textarea className={'form-textarea ' + (this.props.customClassName)}
                value={this.props.value}
                name={this.props.name}
                placeholder={this.props.placeholder}
                onChange={(event) => this.props.onChange({
                  updated: {
                    [event.target.name]: event.target.value
                  },
                  event: event,
                  target: event.target,
                  value: event.target.value,
                  name: event.target.name
                })}
      />
    )
  }
}

Textarea.defaultProps = {
  customClassName: '',
  attachOnChange: true,
  emptyValue: ''
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  value: (props, propname, component) => validateOutOfForm(props, propname, component, 'String'),
  onChange: (props, propname, component) => validateOutOfForm(props, propname, component, 'Function'),
  emptyValue: PropTypes.string.isRequired,

  placeholder: PropTypes.string,
  customClassName: PropTypes.string,
  attachOnChange: PropTypes.bool
};

export default Textarea;
