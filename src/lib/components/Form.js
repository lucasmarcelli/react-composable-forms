import { Button, Checkbox, Label } from '../';
import React, { Component } from 'react';

class Form extends Component {

  constructor(props) {
    super(props);

    // Set state full of values.
    this.initialValues = { ...this.doInitial(props.children), ...this.props.initialValues, ...this.props.values };
    this.state = {
      values: this.initialValues
    };

    // Bind Functions
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.doInitial = this.doInitial.bind(this);
    this.attachHandlers = this.attachHandlers.bind(this);
    this.populate = this.populate.bind(this);
    this.setFullStructure = this.setFullStructure.bind(this);
  }

  render() {
    return (
      <form name={this.props.name}
            className={'composable-form ' + (this.props.customClassName)}
            onSubmit={(event) => this.handleSubmit(event)}
            onReset={(event) => this.handleReset(event)}>
        {this.attachHandlers(this.props.children)}
      </form>
    );
  }

  // A ref for the Form to populate, if they are waiting for network, or something changes dynamically.
  // Sets the initialValues to whatever this was, regardless when it happened.
  populate(data) {
    for(let key of Object.keys(data)){
      data[key] = { ...this.initialValues[key], ...data[key] }
    }
    const updated = { ...this.state.values, ...this.initialValues, ...data };
    this.initialValues = updated;
    this.setState({ values: updated });
  }

  // Change Handler
  handleChange({ updated }) {
    let { values } = { ...this.state };
    values = { ...values, ...updated };
    // If you pass an onChange to the Form, it will fire at each change, while maintaining internal state.
    if (this.props.onChange) {
      let toreturn = this.props.name ? { [this.props.name]: values } : values;
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

  // Reset Handler
  handleReset(event) {
    event.preventDefault();
    let toreturn = this.props.name ? { [this.props.name]: this.state.values } : this.state.values;
    this.setState({ values: this.initialValues }, () => {
      this.props.onReset ? this.props.onReset(toreturn) : null;
    });
  }

  // Sets the full structure of the custom component
  setFullStructure(update) {
    let { values } = this.state;
    values = { ...values, ...update };
    this.initialValues = values;
    this.setState({ values: values });
  }

  // Render the children with onChange props attached.
  attachHandlers(children) {
    return React.Children.map(children, (child) => {
      if(!child) return;
      if(!child.props) return child;
      // Check for type
      if(child.type === Button) return child;
      let handlerType = (child.props.attachOnChange || child.props.attachComponentOnChange) ? 'onChange' : 'onClick';
      let valueType = child.type === Checkbox ? 'checked' : (child.props.attachComponentOnChange ? 'values' : 'value');
      if (child.props.attachOnChange || child.props.attachOnClick || child.props.attachComponentOnChange) {
        let props = {
          [handlerType]: this.handleChange,
          [valueType]: this.state.values[child.props.name]
        };
        if(child.props.attachComponentOnChange) {
          props.setFullStructure = this.setFullStructure;
        }
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

// Setting the initial state
  doInitial(children) {
    let initialValues = {};
    // Map the names to the state, to track
    React.Children.forEach(children, (child) => {
      if(!child || !child.props) return;
      if (child.props.attachOnChange) {
        initialValues[child.props.name] = (child.props.multiple ? [] : child.props.emptyValue);
      } else if (child.props.attachOnClick) {
        initialValues[child.props.name] = false;
      } else if (child.props.attachComponentOnChange) {
        initialValues[child.props.name] = child.props.emptyValue;
      } else if (child.props.children) {
        initialValues = { ...initialValues, ...this.doInitial(child.props.children) };
      }
    });
    return initialValues;
  }
}

Form.defaultProps = {
  customClassName: '',
  initialValues: {}
};

export default Form;
