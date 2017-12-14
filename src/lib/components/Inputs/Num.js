import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validateOutOfForm } from '../Helpers/formUtils';

class Num extends Component {

  render() {
    let style = {};
    if(this.props.size) {
      style.width = (100/this.props.size) +'%';
    }
    return <input name={this.props.name}
                  type="number"
                  className={'form-input ' + this.props.customClassName}
                  value={this.props.value}
                  placeholder={this.props.placeholder}
                  style={style}
                  onChange={(event) => this.props.onChange({
                    updated: {
                      [event.target.name]: event.target.value
                    },
                    event: event,
                    target: event.target,
                    value: event.target.value,
                    name: event.target.name
                  })}/>;
  }
}

Num.defaultProps = {
  customClassName: '',
  attachOnChange: true,
  emptyValue: ''
};


Num.propTypes = {
  name: PropTypes.string.isRequired,
  value: (props, propname, component) => {
    if (props.value === '' || !isNaN(props.value)) {
      if (props.value !== '')
        return validateOutOfForm(props, propname, component, 'Number');
    } else {
      return validateOutOfForm(props, propname, component, 'String', { value: '' })
    }
  },
  onChange: (props, propname, component) => validateOutOfForm(props, propname, component, 'Function'),
  emptyValue: (props, propname, component) => {
    if(props.emptyValue !== '' && isNaN(props.emptyValue)) {
      return new Error('emptyValue must be empty string or number only.')
    }
  },

  placeholder: PropTypes.string,
  customClassName: PropTypes.string,
  attachOnChange: PropTypes.bool
};

export default Num;
