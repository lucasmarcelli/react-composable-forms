import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { validateOutOfForm } from '../Helpers/formUtils';

// Don't want to fail on optional dependency on compile
// Only when they try to use a field without dependency installed
let moment;
try {
  moment = require('moment');
} catch (e) {
  moment = null;
}

class Date extends Component {

  constructor(props){
    super(props);
    this.toMoment = this.toMoment.bind(this);
    if(!moment) {
      let error = new Error('Moment must be installed to use the Date field.');
      error.code = 'EOPDEPERR';
      throw error;
    }
  }

  render() {
    let style = {};
    if(this.props.size) {
      style.width = (100/this.props.size) +'%';
    }
    let date = this.props.value.isValid() ? this.props.value.format('YYYY-MM-DD') : '';
    return <input name={this.props.name}
                  type="date"
                  className={'form-input ' + this.props.customClassName}
                  value={date}
                  placeholder={this.props.placeholder}
                  style={style}
                  onChange={this.toMoment}/>;
  }

  toMoment(event) {
    let value = moment(event.target.value, 'YYYY-MM-DD');
    this.props.onChange({
      updated: {
        [event.target.name]: value
      },
      event: event,
      target: event.target,
      value: value,
      name: event.target.name
    });

  }
}

Date.defaultProps = {
  customClassName: '',
  attachOnChange: true,
  emptyValue: moment ? moment() : 'false',
  value: moment ? moment() : 'false'
};

Date.propTypes = {
  name: PropTypes.string.isRequired,
  value: (props, propname) => {if(props[propname].constructor.name !== 'Moment' && props[propname] !== 'false') return new Error('Value must be a moment. Pass an invalid moment object for an empty field.')},
  onChange: (props, propname, component) => validateOutOfForm(props, propname, component, 'Function'),
  emptyValue: (props, propname) => {if(props[propname].constructor.name !== 'Moment' && props[propname] !== 'false') return new Error('emptyValue must be a moment. Pass an invalid moment object for an empty field.')},

  placeholder: PropTypes.string,
  customClassName: PropTypes.string,
  attachOnChange: PropTypes.bool
};

export default Date;
