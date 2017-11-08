import React, { Component } from 'react';

class Button extends Component {

  render() {
    return (
      <button name={this.props.name}
              className={'form-button' + this.props.customClassName}
              type={(this.props.submit ? 'submit' : 'button')}
              onClick={(this.props.onClick ? (event) => this.props.onClick({ event: event, clicked: this.props.name }) : () => {
              })}
      >{this.props.text || (this.props.submit ? 'Submit' : 'Click!')}</button>
    );
  }

}

Button.defaultProps = {
  customClassName: '',
  checked: false,
  submit: false
};


export default Button;
