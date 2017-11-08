import React, { Component } from 'react';
import { Button, Select, Text } from '../';

class Form extends Component {

  constructor(props) {
    super(props);

    // Set state full of values.
    let initialValues = this.doInitial(props.children);
    this.state = {
      values: initialValues
    };

    // Bind Functions
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.doInitial = this.doInitial.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
  }

  render() {
    return (
      // Attach submit handler to form and render children
      <form className={'composable-form ' + (this.props.customClassName || '') }
            onSubmit={(event) => this.handleSubmit(event)}>
        {this.renderChildren(this.props.children)}
      </form>
    )
  }

  // Change Handler
  handleChange({updated, event, target, value, name}) {
    let { values } = { ...this.state };
    values = {...values, ...updated};
    // If you pass an onChange to the Form, it will fire at each change, while maintaining internal state.
    if(this.props.onChange) {
      this.setState({values: values}, () => this.props.onChange(this.state.values));
    } else {
      this.setState({values: values});
    }
  }

  // Submit Handler
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.values);
  }

  // Render the children with onChange props attached.
  renderChildren(children) {
    return React.Children.map(children, (child) => {
      // Check for type
      switch(child.type){
        case Text:
        case Select:
          return React.cloneElement(child, {
            // Attach change handler to each of the components, will be generalized later.
            onChange: this.handleChange
          });
        case Button:
          // Buttons don't need anything attached, the onClick is handled in the parent if it's not a submit.
          return child;
        default:
          // If it's not a recognized component, recurse through the tree.
          if(child.props.children){
            return this.renderChildren(child.props.children, child);
          }else{
            return child;
          }
      }
    });
  }

  // Setting the initial state
  // TODO: If elements are added in after Construction, update state to relfect that.
  doInitial(children) {
    let initialValues = {};
    // Map the names to the state, to track
    React.Children.forEach(children, (child) => {
      switch(child.type){
        case Select:
        case Text:
          initialValues[child.props.name] = '';
          break;
        case Button:
          break;
        default:
          if(child.props.children){
            initialValues = {...initialValues, ...this.doInitial(child.props.children)}
          }
          break;
      }
    });
    return initialValues;
  }

}

export default Form;
