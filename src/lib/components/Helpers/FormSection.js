import { Button, Checkbox, Label } from '../..';
import React, { Component } from 'react';

class FormSection extends Component {

  constructor(props) {
    super(props);
    
    this.handleChange = this.handleChange.bind(this);
    this.attachHandlers = this.attachHandlers.bind(this);
  }

  render() {
    return (
      <div className={'form-section ' + (this.props.customClassName)}>
        {this.attachHandlers(this.props.children)}
      </div>
    );
  }

  attachHandlers(children) {
    return React.Children.map(children, (child) => {
      if(!child) return;
      if(!child.props) return child;
      // Check for type
      if(child.type === Button) return child;
      let handlerType = child.props.attachOnChange ? 'onChange' : 'onClick';
      let valueType = child.type === Checkbox ? 'checked' : 'value';
      if (child.props.attachOnChange || child.props.attachOnClick) {
        let props = {
          [handlerType]: this.handleChange,
          [valueType]: this.props.values[child.props.name]
        };
        const element = React.cloneElement(child, props);
        if(child.props.label) {
          return (
            <Label {...child.props.label}>
              {element}
            </Label>
          )
        } else {
          return element;
        }
      } else {
        if (child.props.children) {
          return this.attachHandlers(child.props.children, child);
        } else {
          return child;
        }
      }
    })
  }

  handleChange({ updated, ...rest }) {
    // Essentially the FormSection just passes props through to the Form for state.
    // This just makes development a lot easier - everything is grouped nicely, and you can modularize FormSections.
    updated = { ...this.props.values, ...updated };
    updated = { [this.props.name]: updated };
    this.props.onChange({ updated, ...rest })
  }
}

FormSection.defaultProps = {
  attachOnChange: true,
  hasSubComponents: true,
  values: {},
  customClassName: ''
};

export default FormSection;
