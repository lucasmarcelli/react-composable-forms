import React, { Component } from 'react';

class FormSectionTemplate extends Component {

  render() {
    return (
      <div className={'form-section ' + (this.props.customClassName)}>
        {this.props.children}
      </div>
    );
  }

}

FormSectionTemplate.defaultProps = {
  customClassName: '',
  emptyValue: {}
};

export default FormSectionTemplate;
