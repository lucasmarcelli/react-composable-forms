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
      let initial = this.buildInitial(child.props.children);
      // let childSubmitAs = initial.submitAs;
      let childValues = initial.values;
      values = { ...values, ...childValues };
      // submitAs = { ...submitAs, ...childSubmitAs };
    }
  });
  return { values };
};

export { buildInitial };
