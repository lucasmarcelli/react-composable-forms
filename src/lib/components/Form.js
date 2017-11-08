import { Button, Checkbox, Label } from '../';
import React, { Component } from 'react';

class Form extends Component {

  constructor(props) {
    super(props);

    // Set state full of values.
    let initialValues = { ...this.doInitial(props.children), ...this.props.initialValues };
    this.state = {
      values: initialValues,
      name: this.props.name ? this.props.name : undefined
    };

    // Bind Functions
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.doInitial = this.doInitial.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
    this.populate = this.populate.bind(this);
  }

  render() {
    return (
      // Attach submit handler to form and render children
      <form name={this.props.name}
            className={'composable-form ' + (this.props.customClassName)}
            onSubmit={(event) => this.handleSubmit(event)}>
        {this.renderChildren(this.props.children)}
      </form>
    );
  }

  // A ref for the Form to populate, if they are waiting for network, or something changes dynamically.
  populate(data) {
    const updated = { ...this.state.values, ...data };
    this.setState({ values: updated });
  }

  // Change Handler
  handleChange({ updated }) {
    let { values } = { ...this.state };
    values = { ...values, ...updated };
    // If you pass an onChange to the Form, it will fire at each change, while maintaining internal state.
    if (this.props.onChange) {
      let toreturn = this.props.name ? { [this.props.name]: this.state.values } : this.state.values;
      this.setState({ values: values }, () => this.props.onChange(toreturn));
    } else {
      this.setState({ values: values });
    }
  }

  // Submit Handler
  handleSubmit(event) {
    event.preventDefault();
    let toreturn = this.props.name ? { [this.props.name]: this.state.values } : this.state.values;
    this.props.onSubmit(toreturn);
  }

  // Render the children with onChange props attached.
  renderChildren(children) {
    return React.Children.map(children, (child) => {
      if(!child) return;
      // Check for type
      if(child.type === Button) {
        return child;
      }
      let handlerType = child.props.attachOnChange ? 'onChange' : 'onClick';
      let valueType = child.type === Checkbox ? 'checked' : 'value';
      if (child.props.attachOnChange || child.props.attachOnClick) {
        let props = {
            [handlerType]: this.handleChange,
            [valueType]: this.state.values[child.props.name]
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
          return this.renderChildren(child.props.children, child);
        } else {
          return child;
        }
      }
    })
  }

// Setting the initial state
// TODO: Allow setting values at any time
doInitial(children) {
  let initialValues = {};
  // Map the names to the state, to track
  React.Children.forEach(children, (child) => {
    if(!child) return;
    if (child.props.attachOnChange) {
      initialValues[child.props.name] = '';
    } else if (child.props.attachOnClick) {
      initialValues[child.props.name] = false;
    } else if (child.props.children) {
      initialValues = { ...initialValues, ...this.doInitial(child.props.children) };
    }
  });
  return initialValues;
}

}

Form.defaultProps = {
  customClassName: '',
  attachOnChange: true,
  initialValues: {}
};


export default Form;
