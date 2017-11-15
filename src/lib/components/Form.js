import React, { Component } from 'react';
import { Label } from '../index';

class Form extends Component {
    
    constructor(props){
        super(props);

        this.initialValues = { ...this.buildInitial(props.children), ...this.props.initialValues };
        this.state = {
          values: this.initialValues
        };

        this.populate = this.populate.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.attachInputHandlers = this.attachInputHandlers.bind(this);
        this.setOnChange = this.setOnChange.bind(this);
        this.buildInitial = this.buildInitial.bind(this);
        this.setOnComponentChange = this.setOnComponentChange.bind(this);
        this.setInitial = this.setInitial.bind(this);
    }
    
    render(){
        return(
            <form name={this.props.name}
                  className={'composable-form ' + (this.props.customClassName)}
                  onSubmit={(event) => this.handleSubmit(event)}
                  onReset={(event) => this.handleReset(event)}>
              {this.attachInputHandlers(this.props.children)}
            </form>
        )
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

    buildInitial(children) {
      let values = {};
      React.Children.forEach(children, (child) => {
        if(!child) return;
        if(child.props.attachOnChange) {
          values[child.props.name] = (child.props.multiple ? [] : child.props.emptyValue);
        } else if(child.props.attachOnClick) {
          values[child.props.name] = false;
        } else if (child.props.attachOnComponentChange) {
          values[child.props.name] = child.props.emptyValue;
        } else if (child.props.children) {
          values = { ...values, ...this.buildInitial(child.props.children) };
        }
      });
      return values;
    }

    setInitial(values, name) {
      this.initialValues[name] = { ...values, ...this.initialValues[name] };
      this.setState({ values: this.initialValues });
    }

    attachInputHandlers(children) {
      return React.Children.map(children, (child) => {
        if (!child) return;
        else {
          if (!child.props) return child;
          else if (child.props.attachOnChange) {
            child = this.setOnChange(child);
          } else if (child.props.attachOnClick) {
            child = this.setOnClick(child);
          } else if (child.props.attachOnComponentChange) {
            return this.setOnComponentChange(child);
          } else if (child.props.children) {
            child = React.cloneElement(child, child.props, this.attachInputHandlers(child.props.children));
          }

          if(child.props.label) {
            return (
            <Label labelClass={child.props.label.labelClass}
                   textClass={child.props.label.textClass}
                   text={child.props.label.text}
                    >
              {child}
            </Label>
            )
          } else {
            return child;
          }
        }
      });
    }

    setOnComponentChange(child) {
      if(!this.state || !this.state.values || this.state.values[child.props.name] === undefined ) {
        return new Error('The state of the form does not match the rendered child ' + child.props.name);
      }
      let value = child.props.valueKey || 'values';
      const props = {
        onChange: this.handleChange,
        [value]: this.state.values[child.props.name],
        setInitial: this.setInitial
      };
      return (React.cloneElement(child, props));
    }

    setOnChange(child) {
      if(!this.state || !this.state.values || this.state.values[child.props.name] === undefined ) {
        return new Error('The state of the form does not match the rendered children');
      }
      let value = child.props.valueKey || 'value';
      const props = {
        onChange: this.handleChange,
        [value]: this.state.values[child.props.name]
      };
      return (React.cloneElement(child, props));
    }

    setOnClick(child) {
      if(!this.state || !this.state.values || this.state.values[child.props.name] === undefined ) {
        return new Error('The state of the form does not match the rendered children');
      }
      let value = child.props.valueKey || 'value';
      const props = {
        onClick: this.handleChange,
        [value]: this.state.values[child.props.name]
      };
      return (React.cloneElement(child, props));
    }

    handleSubmit(event) {
      event.preventDefault();
      this.props.onSubmit((this.props.name ? { [this.props.name] : this.state.values } : this.state.values));
    }

    handleReset(event) {
      event.preventDefault();
      this.setState({ values: this.initialValues }, () => {
        let toreturn = this.props.name ? { [this.props.name]: this.state.values } : this.state.values;
        this.props.onReset && this.props.onReset(toreturn);
      });
    }

    handleChange({ updated, ...rest }) {
      let { values } = this.state;
      values = { ...values, ...updated };
      // If you pass an onChange to the Form, it will fire at each change, while maintaining internal state.
      if (this.props.onChange) {
        let toreturn = this.props.name ? { [this.props.name]: values } : values;
        this.setState({ values: values }, () => this.props.onChange({ updated: toreturn, ...rest }));
      } else {
        this.setState({ values: values });
      }
    }

}

Form.defaultProps = {
  customClassName: '',
  initialValues: {}
};

export default Form;
