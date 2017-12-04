import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {

  render() {
    let style = {};
    if(this.props.size) {
      style.maxWidth = (100/this.props.size)/this.props.size +'%';
    }
    return (
      <button name={this.props.name}
              className={'form-button ' + this.props.customClassName}
              type={(this.props.submit ? 'submit' : (this.props.reset ? 'reset' : 'button'))}
              onClick={(this.props.onClick ? (event) => this.props.onClick(event) : () => {})}
              style={style}
      >{this.props.text || (this.props.submit ? 'Submit' : (this.props.reset ? 'Reset' : 'Click'))}</button>
    );
  }

}

Button.defaultProps = {
  customClassName: '',
  submit: false,
  reset: false
};

Button.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  submit: PropTypes.bool,
  reset: PropTypes.bool,
  customClassName: PropTypes.string,
  attachOnClick: PropTypes.bool
};


export default Button;
