import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Label extends Component {

  render() {

    let style = {};
    if(this.props.size) {
      style.width = (100/this.props.size) +'%';
    }
    return (
      <label className={'form-label ' + this.props.labelClass}
              style={style}
      >
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
