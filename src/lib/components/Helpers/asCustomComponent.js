import { Button, Checkbox, Label } from '../..';
import React from 'react';

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const asCustomComponent = (Custom,
                           {
                             handleChange,
                             attachHandlers,
                             doInitial,
                             noWrapper = false,
                             maintainState = true,
                             setInputToState = false,
                             setStateOnUpdate = true,
                             passStateUpdatesToForm = true
                           } = {} ) => {
  //eslint-disable-next-line react/display-name
  const CustomComponent = class extends Custom {
    // Using the Inheritance Inversion pattern to give me access to children at render and stuff.
    constructor(props) {
      // Getting initial values + structure for the Form piece.
      let { state } = super(props);
      this.initialValues = { ...this.doInitial(super.render().props.children), ...this.props.initialValues, ...this.props.values };

      // Send the structure back up to the Form.
      this.props.setFullStructure({ [props.name]: this.initialValues });
      // Set initial state, default action.
      if(maintainState){
        this.state = {
          values: this.initialValues,
          ...state
        };
      }

      this.handleChange = handleChange ? handleChange : this.handleChange.bind(this);
      this.attachHandlers = attachHandlers ? attachHandlers : this.attachHandlers.bind(this);
      this.doInitial = doInitial ? doInitial : this.doInitial.bind(this);
      this.setFullStructure = this.setFullStructure.bind(this);
    }

    componentDidMount() {
      if(maintainState) {
        this.setState(this.state);
      }
      super.componentDidMount ? super.componentDidMount() : null;
    }

    // Default action is to update on each prop change.
    componentWillReceiveProps(nextProps) {
      if(maintainState && setStateOnUpdate) {
        this.setState({ values: nextProps.values, noUpdate: true });
      }
      super.componentWillReceiveProps ? super.componentWillReceiveProps(nextProps) : null;
    }

    // Hijack setState to pass any local state changes for values up to the Form.
    setState({ noUpdate, values, ...rest }, callback) {
      if(passStateUpdatesToForm && values && !noUpdate) {
        this.props.onChange({ [this.props.name]: values })
      }
     super.setState({ values: values, ...rest }, callback);
    }

    // Render the cloned component (Not true inheritance this way, just some weird composistion ;D)
    render() {
      let elementTree = super.render();
      let { children } = elementTree.props;
      children = this.attachHandlers(children);
      return React.cloneElement(elementTree, {}, children);
    }

    // Update the parent.
    handleChange({ updated, ...rest }) {
      updated = { ...this.props.values, ...updated };
      updated = { [this.props.name]: updated };
      this.props.onChange({ updated, ...rest })
    }

    // Render the children with onChange props attached.
    attachHandlers(children) {
      return React.Children.map(children, (child) => {
        // If falsey or has no props return
        if(!child) return;
        if(!child.props) return child;
        // Check for type
        if(child.type === Button) return child;
        let handlerType = (child.props.attachOnChange || child.props.attachComponentOnChange) ? 'onChange' : 'onClick';
        let valueType = child.type === Checkbox ? 'checked' : (child.props.attachComponentOnChange ? 'values' : 'value');
        if (child.props.attachOnChange || child.props.attachOnClick || child.props.attachComponentOnChange) {
          // Attach the handler and the controlled value
          let props = {
            [handlerType]: this.handleChange,
            [valueType]: (setInputToState ? this.state[child.props.name] : this.props.values[child.props.name])
          };
          if(child.props.attachComponentOnChange) {
            props.setFullStructure = this.setFullStructure;
          }
          const element = React.cloneElement(child, props);
          // Stick a label on it if they specified
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
            // Recurse to the children, if nothing attached.
            // Each sub component is responsible for attaching and distributing values, so anything that was attached to above
            // will not have anything attached within it.
            return this.attachHandlers(child.props.children, child);
          } else {
            return child;
          }
        }
      })
    }

    // Initial values/state
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

    // Get structure of sub components, and pass em on up.
    setFullStructure(update) {
      let { values } = this.state;
      values = { ...values, ...update };
      this.props.setFullStructure({ [this.props.name]: values });
    }
  };

  CustomComponent.displayName = noWrapper ? getDisplayName(Custom) : `asCustomComponent(${getDisplayName(Custom)})`;

  // Custom Components should have attachComponentOnChange set to true.
  CustomComponent.defaultProps = {
    attachComponentOnChange: true,
    values: {},
    customClassName: ''
  };

  return CustomComponent;
};

export default asCustomComponent;
