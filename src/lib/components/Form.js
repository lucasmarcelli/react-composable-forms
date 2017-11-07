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
    this.attachPropsToChildren = this.attachPropsToChildren.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
  }

  render() {
    return (
      <form className={'composable-form ' + (this.props.customClassName || '') }
            onSubmit={(event) => this.handleSubmit(event)}>
        {this.renderChildren()}
      </form>
    )
  }
  
  handleChange({updated, event, target, value, name}) {
    let { values } = { ...this.state };
    values = {...values, ...updated};
    if(this.props.onChange) {
      this.setState({values: values}, () => this.props.onChange(updated, event, target, value, name));
    } else {
      this.setState({values: values});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.values);
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child) =>{
      switch(child.type){
        case Text:
        case Select:
          return React.cloneElement(child, {
            onChange: this.handleChange
          });
        case Button:
          return child;
        default:
          if(child.props.children){
            return this.attachPropsToChildren(child.props.children, child);
          }else{
            return child;
          }
      }

    });
  }

  attachPropsToChildren(children, component) {
    let thechildren = React.Children.map(children, (child) => {
      switch(child.type){
        case Text:
        case Select:
          return React.cloneElement(child, {
            onChange: this.handleChange
          });
        case Button:
          return child;
        default:
          if(child.props.children){
            return this.attachPropsToChildren(child.props.children, child);
          }else{
            return child;
          }
      }
    });
    return React.cloneElement(component, {
      children: thechildren
    });
  }

  doInitial(children) {
    let initialValues = {};
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
