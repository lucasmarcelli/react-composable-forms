import React, { Component } from 'react';
import { Label, Checkbox } from '../index';
import PropTypes from 'prop-types';
import './Form.scss';

class Form extends Component {
    
    constructor(props){
        super(props);

        let { values } = this.buildInitial(props.children);
        let initialValues = { ...values, ...this.props.initialValues };
        this.state = {
          initialValues: initialValues,
          values: initialValues
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
        this.setSubmitAs = this.setSubmitAs.bind(this);
        this.buildWithStructure = this.buildWithStructure.bind(this);
    }
    
    render(){
        return(
            <form name={this.props.name}
                  className={'composable-form ' + (this.props.structure && !this.props.noStyle ? 'styled ' : '') + (this.props.customClassName)}
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
        data[key] = { ...this.state.initialValues[key], ...data[key] }
      }
      const updated = { ...this.state.values, ...this.state.initialValues, ...data };
      this.setState({ values: updated, initialValues: updated });
    }

    buildInitial(children) {
      let values = {};
      // let submitAs = {};
      React.Children.forEach(children, (child) => {
        if(!child) return;
        if(child.props.attachOnChange) {
          values[child.props.name] = (child.props.multiple ? [] : child.props.emptyValue);
          // child.props.submitType && (submitAs[child.props.name] = child.props.submitType);
        } else if(child.props.attachOnClick) {
          values[child.props.name] = false;
          // child.props.submitType && (submitAs[child.props.name] = child.props.submitType);
        } else if (child.props.attachOnComponentChange) {
          values[child.props.name] = child.props.emptyValue || {};
          // child.props.submitType && (submitAs[child.props.name] = { submitAs: child.props.submitType })
        } else if (child.props.children) {
          let initial = this.buildInitial(child.props.children);
          // let childSubmitAs = initial.submitAs;
          let childValues = initial.values;
          values = { ...values, ...childValues };
          // submitAs = { ...submitAs, ...childSubmitAs };
        }
      });
      return { values };
    }

    setInitial(values, name) {
      let { initialValues } = this.state;
      initialValues[name] = values;
      this.setState({ values: initialValues, initialValues: initialValues });
    }

    attachInputHandlers(children) {
      let torender = React.Children.map(children, (child) => {
        if (!child) return;
        else {
          if (!child.props) return child;
          else if (child.props.attachOnChange) {
            child = this.setOnChange(child);
          } else if (child.props.attachOnClick) {
            child = this.setOnClick(child);
          } else if (child.props.attachOnComponentChange) {
            child = this.setOnComponentChange(child);
          } else if (child.props.children) {
            child = React.cloneElement(child, child.props, this.attachInputHandlers(child.props.children));
          }
        }

        if(child.props.label) {
          return (
            <Label labelClass={(child.props.label.labelClass || '') + (child.type === Checkbox ? ' checkbox-label' : '')}
                   textClass={child.props.label.textClass}
                   text={child.props.label.text}
            >
              {child}
            </Label>
          )
        } else {
          return child;
        }
      });

      if(this.props.structure) {
        return this.buildWithStructure(torender);
      } else {
        return torender;
      }
    }

    setSubmitAs(submitAs, name) {
      // console.log(submitAs, name);
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
      this.setState({ values: this.state.initialValues }, () => {
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

    buildWithStructure(children) {
      let torender = [];
      children = React.Children.toArray(children);
      let counter = 0;
      for(let thing of this.props.structure) {
        let row = [];
        if(Number.isInteger(thing)){
          for(let i = 0; i < thing; i++) {
            let child = children.shift();
            row.push(React.cloneElement(child, { size: thing, ...child.props }));
          }
          torender.push(<div className="form-row" key={'structure-' + counter}>{row}</div>);
        } else {
          let child = children.shift();
          child = React.cloneElement(child, { structure: thing, thisKey: counter, key: 'structure-' + counter,  ...child.props });
          torender.push(child);
        }
        counter++;
      }
      return torender;
    }

}

Form.defaultProps = {
  customClassName: '',
  initialValues: {},
  structure: false
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,

  name: PropTypes.string,
  customClassName: PropTypes.string,
  onChange: PropTypes.func,
  onReset: PropTypes.func,
  initialValues: PropTypes.object
};

export default Form;
