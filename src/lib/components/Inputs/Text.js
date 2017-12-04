import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validateOutOfForm } from '../Helpers/formUtils';

class Text extends Component {

  render() {
    let style = {};
    if(this.props.size) {
      style.width = (100/this.props.size) +'%';
    }
    return <input name={this.props.name}
                  type="text"
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

Text.defaultProps = {
  customClassName: '',
  attachOnChange: true,
  emptyValue: ''
};


Text.propTypes = {
  name: PropTypes.string.isRequired,
  value: (props, propname, component) => validateOutOfForm(props, propname, component, 'String'),
  onChange: (props, propname, component) => validateOutOfForm(props, propname, component, 'Function'),
  emptyValue: PropTypes.string.isRequired,

  placeholder: PropTypes.string,
  customClassName: PropTypes.string,
  attachOnChange: PropTypes.bool
};

export default Text;
