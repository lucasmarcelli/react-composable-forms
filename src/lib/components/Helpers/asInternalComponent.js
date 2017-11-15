import { Label } from '../../index';
import React from 'react';

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const asInternalComponent = (Custom, { setToState = false, maintainState = false, customName = false } = {}) => {
  const CustomComponent = class extends Custom {

    constructor(props) {
      let { state } = super(props);

      this.initialValues = { ...this.buildInitial(props.children), ...this.props.initialValues };
      if(maintainState) {
        this.state = {
          ...state,
          values: this.initialValues
        }
      }

      this.props.setInitial && this.props.setInitial(this.initialValues, this.props.name);

      this.attachInputHandlers = this.attachInputHandlers.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.setOnChange = this.setOnChange.bind(this);
      this.setOnChangeToState = this.setOnChangeToState.bind(this);
      this.setOnClick = this.setOnClick.bind(this);
      this.setOnClickToState = this.setOnClickToState.bind(this);
    }

    render() {
      let elementTree = super.render();
      let { children } = elementTree.props;
      children = this.attachInputHandlers(children);
      return React.cloneElement(elementTree, {}, children);
    }

    buildInitial(children) {
      if(super.buildInitial) {
        return super.buildInitial(children);
      } else {
        let values = {};
        React.Children.forEach(children, (child) => {
          if(!child) return;
          if(child.props.attachOnChange) {
            values[child.props.name] = (child.props.multiple ? [] : child.props.emptyValue);
          } else if(child.props.attachOnClick) {
            values[child.props.name] = false;
          } else if (child.props.children) {
            values = { ...values, ...this.buildInitial(child.props.children) };
          }
        });
        return values;
      }
    }

    handleChange({ updated, ...rest }) {
      if(super.handleChange) {
        super.handleChange({ ...updated, ...rest })
      } else {
        updated = { ...this.props.values, ...updated };
        updated = { [this.props.name]: updated };
        this.props.onChange({ updated, ...rest })
      }
    }

    attachInputHandlers(children) {
      return React.Children.map(children, (child) => {
        if(!child) return;
        else {
          if(!child.props) return child;
          else if(child.props.attachOnChange){
            child = (setToState ? this.setOnChangeToState(child) : this.setOnChange(child));
          } else if(child.props.attachOnClick) {
            child = (setToState ? this.setOnClickToState(child) : this.setOnClick(child));
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

    setOnChangeToState(child) {
      if(!this.state || !this.state.values || this.state.values[child.props.name] === undefined ) {
        return null;
      }
      let value = child.props.valueKey || 'value';
      const props = {
        onChange: this.handleChange,
        [value]: this.state.values[child.props.name]
      };
      return (React.cloneElement(child, props));
    }

    setOnClickToState(child) {
      if(!this.state || !this.state.values || this.state.values[child.props.name] === undefined ) {
        return null;
      }
      let value = child.props.valueKey || 'value';
      const props = {
        onClick: this.handleChange,
        [value]: this.state.values[child.props.name]
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
    ...Custom.defaultProps
  };

  CustomComponent.displayName = customName || getDisplayName(Custom);

  return CustomComponent;
};

export default asInternalComponent;
