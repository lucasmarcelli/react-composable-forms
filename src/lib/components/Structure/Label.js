import React, {Component} from 'react';

class Label extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <label className={'form-label ' + (this.props.labelClass || '')}>
        <span className={'form-label-text ' + (this.props.textClass || '')}>{this.props.text}</span>
        {this.props.children}
      </label>
    )
  }

}

export default Label;
