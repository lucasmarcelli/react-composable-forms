import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { validateOutOfForm } from '../Helpers/formUtils';


class Date extends Component {

  constructor(props){
    super(props);
    this.toMoment = this.toMoment.bind(this);
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
    })
  }
}

Date.defaultProps = {
  customClassName: '',
  attachOnChange: true,
  emptyValue: moment(),
  value: moment()
};

Date.propTypes = {
  name: PropTypes.string.isRequired,
  value: (props, propname) => {if(props[propname].constructor.name !== 'Moment') return new Error('Value must be a moment. Pass an invalid moment object for an empty field.')},
  onChange: (props, propname, component) => validateOutOfForm(props, propname, component, 'Function'),
  emptyValue: (props, propname) => {if(props[propname].constructor.name !== 'Moment') return new Error('emptyValue must be a moment. Pass an invalid moment object for an empty field.')},

  placeholder: PropTypes.string,
  customClassName: PropTypes.string,
  attachOnChange: PropTypes.bool
};

export default Date;
