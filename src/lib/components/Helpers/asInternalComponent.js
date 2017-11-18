import { Label } from '../../index';
import React from 'react';

import { buildInitial } from './formFunctions';

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const asInternalComponent = (Custom, { maintainState = false, customName = false } = {}) => {
  const CustomComponent = class extends Custom {

    constructor(props) {
      let { state } = super(props);
      let { values } = this.buildInitial(props.children);
      values = (Array.isArray(values)) ? [...values, ...[{ ...values[0], ...props.values[0] }]] : { ...values, ...props.values };
      this.initialValues = values;
      if(maintainState) {
        this.state = {
          ...state,
          values: this.initialValues
        }
      }

      this.props.setInitial && this.props.setInitial(this.initialValues, this.props.name);
      // this.props.setSubmitAs && this.props.setSubmitAs(this.submitAs, this.props.name);

      this.attachInputHandlers = this.attachInputHandlers.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.setOnChange = this.setOnChange.bind(this);
      this.setOnClick = this.setOnClick.bind(this);
      this.setOnComponentChange = this.setOnComponentChange.bind(this);
      this.setSubmitAs = this.setSubmitAs.bind(this);
      this.setInitial = this.setInitial.bind(this);
    }

    render() {
      let elementTree = super.render();
      let { children } = elementTree.props;
      children = this.attachInputHandlers(children);
      return React.cloneElement(elementTree, {}, children);
    }

    setInitial(values, name) {
      if(super.setInitial) {
        super.setInitial(values, name);
      } else {
        this.initialValues[name] = values instanceof Array ? [...values, ...this.initialValues[name]] : { ...values, ...this.initialValues[name] };
        this.props.setInitial && this.props.setInitial(this.initialValues, this.props.name);
      }
    }

    buildInitial(children) {
      if(super.buildInitial) {
        return super.buildInitial(children);
      } else {
        return buildInitial(children);
      }
    }

    handleChange({ updated, ...rest }) {
      if(super.handleChange){
        super.handleChange({ updated, ...rest });
      } else {
        updated = { ...this.props.values, ...updated };
        updated = { [this.props.name]: updated };
        this.props.onChange({ updated, ...rest });
      }
    }

    setSubmitAs(submitAs, name) {
      // console.log(submitAs, name);
    }

    attachInputHandlers(children) {
      return React.Children.map(children, (child) => {
        if(!child) return;
        else {
          if(!child.props) return child;
          else if(child.props.attachOnChange){
            child = this.setOnChange(child);
          } else if(child.props.attachOnClick) {
            child = this.setOnClick(child);
          } else if (child.props.attachOnComponentChange) {
              return this.setOnComponentChange(child);
          } else if (child.props.children) {
            child = React.cloneElement(child, child.props, this.attachInputHandlers(child.props.children));
          }
        }

        if(child && child.props && child.props.label) {
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
      });
    }

    setOnComponentChange(child) {
      if(super.setOnComponentChange){
        return super.setOnComponentChange(child);
      } else {
        if(!this.props || !this.props.values || this.props.values[child.props.name] === undefined ) {
          return new Error('The props of the form does not match the rendered child ' + child.props.name);
        }
        let value = child.props.valueKey || 'values';
        const props = {
          onChange: this.handleChange,
          [value]: this.props.values[child.props.name],
          setInitial: this.setInitial
        };
        return (React.cloneElement(child, props));
      }
    }

    setOnChange(child) {
      if(!this.props || !this.props.values || this.props.values[child.props.name] === undefined) {
        return null;
      }
      let value = child.props.valueKey || 'value';
      const props = {
        onChange: this.handleChange,
        [value]: this.props.values[child.props.name]
      };
      return (React.cloneElement(child, props));
    }

    setOnClick(child) {
      if(!this.props || !this.props.values || this.props.values[child.props.name] === undefined ) {
        return null;
      }
      let value = child.props.valueKey || 'value';
      const props = {
        onClick: this.handleChange,
        [value]: this.props.values[child.props.name]
      };
      return (React.cloneElement(child, props));
    }
  };

  CustomComponent.defaultProps = {
    attachOnComponentChange: true,
    initialValues: {},
    ...Custom.defaultProps
  };

  CustomComponent.displayName = customName || getDisplayName(Custom);

  return CustomComponent;
};

export default asInternalComponent;
