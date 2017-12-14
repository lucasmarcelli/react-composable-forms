import React from 'react';
const buildInitial = (children) => {
  let values = {};
  // let submitAs = {};
  React.Children.forEach(children, (child) => {
    if(!child || !child.props) return;
    if(child.props.attachOnChange) {
      values[child.props.name] = (child.props.multiple ? [] : child.props.emptyValue);
      // child.props.submitType && (submitAs[child.props.name] = child.props.submitType);
    } else if(child.props.attachOnClick) {
      values[child.props.name] = false;
      // child.props.submitType && (submitAs[child.props.name] = child.props.submitType);
    } else if (child.props.attachOnComponentChange) {
      values[child.props.name] = child.props.emptyValue;
      // child.props.submitType && (submitAs[child.props.name] = { submitAs: child.props.submitType })
    } else if (child.props.children) {
      let initial = buildInitial(child.props.children);
      // let childSubmitAs = initial.submitAs;
      let childValues = initial.values;
      values = { ...values, ...childValues };
      // submitAs = { ...submitAs, ...childSubmitAs };
    }
  });
  return { values };
};

const validateOutOfForm = (props, propname, component, type, { compare, value } = {}) => {
  if(props.noForm) {
    if(props[propname] === undefined) {
      return new Error(component + ' requires the prop ' + propname + ' if not handled by a form component. Validation Failed.');
    } else if(props[propname].constructor.name !== type || (compare && props[propname].constructor.name !== compare)) {
      return new Error(component + ' requires the prop ' + propname + ' as a(n) ' + (type ? type : compare) + ' if not handled by a form component. Validation Failed.')
    } else if(value !== undefined && props[propname] !== value) {
      return new Error(component + ' requires that the prop ' + propname + ' be === to ' + (value === '' ? 'the empty string ' : value));
    }
  }
};

export { buildInitial, validateOutOfForm };
