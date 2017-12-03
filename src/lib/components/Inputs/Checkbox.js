import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validateOutOfForm } from '../Helpers/formUtils';

class Checkbox extends Component {

  render() {
    return (
      <input type="checkbox"
             checked={this.props.checked}
             name={this.props.name}
             className={'form-checkbox ' + (this.props.customClassName)}
             onClick={(event) => this.props.onClick({
               updated: {
                 [event.target.name]: event.target.checked
               },
               event: event,
               target: event.target,
               checked: event.target.checked,
               name: event.target.name
              })}
             />
    )
  }
}

Checkbox.defaultProps = {
  customClassName: '',
  emptyValue: false,
  attachOnClick: true,
  valueKey: 'checked'
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: (props, propname, component) => validateOutOfForm(props, propname, component, 'Function'),
  emptyValue: PropTypes.bool.isRequired,

  checked: (props, propname, component) => {
    if(props.checked === undefined && props.noForm){
      console.log(props.checked)
      return new Error(component + ' requires the prop ' + propname + ' if not handled by a form component. Validation Failed.')
    }
  },
  attachOnClick: PropTypes.bool,
  customClassName: PropTypes.string
};

export default Checkbox;
