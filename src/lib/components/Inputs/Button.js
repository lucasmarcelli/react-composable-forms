import React, { Component } from 'react';

class Button extends Component {

  render() {
    return (
      <button name={this.props.name}
              className={'form-button' + this.props.customClassName}
              type={(this.props.submit ? 'submit' : (this.props.reset ? 'reset' : 'button'))}
              onClick={(this.props.onClick ? (event) => this.props.onClick(event) : () => {})}
      >{this.props.text || (this.props.submit ? 'Submit' : (this.props.reset ? 'Reset' : 'Click'))}</button>
    );
  }

}

Button.defaultProps = {
  customClassName: '',
  submit: false
};


export default Button;
