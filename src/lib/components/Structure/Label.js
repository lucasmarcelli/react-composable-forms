import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Label extends Component {

  render() {
    return (
      <label className={'form-label ' + this.props.labelClass}>
        <span className={'form-label-text ' + this.props.textClass}>{this.props.text}</span>
        {this.props.children}
      </label>
    )
  }

}

Label.defaultProps = {
  labelClass: '',
  textClass: '',
  text: ''
};

Label.propTypes = {
  labelClass: PropTypes.string,
  textClass: PropTypes.string,
  text: PropTypes.string.isRequired
};


export default Label;
