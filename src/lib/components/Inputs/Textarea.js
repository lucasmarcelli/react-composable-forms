import React, { Component } from 'react';

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

export default Textarea;
