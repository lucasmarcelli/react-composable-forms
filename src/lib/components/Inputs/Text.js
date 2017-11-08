import React, { Component } from 'react';

class Text extends Component {

  render() {
    return <input name={this.props.name}
                  type="text"
                  className={'form-input ' + this.props.customClassName}
                  value={this.props.value}
                  placeholder={this.props.placeholder}
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
  value: '',
  attachOnChange: true
};

export default Text;
