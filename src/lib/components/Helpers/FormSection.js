import React, { Component } from 'react';

class FormSection extends Component {

  render() {
    return (
      <div className={'form-section ' + (this.props.customClassName)}>
        {this.props.children}
      </div>
    );
  }

}

FormSection.defaultProps = {
  attachComponentOnChange: true,
  values: {},
  customClassName: '',
  emptyValue: {}
};

export default FormSection;
