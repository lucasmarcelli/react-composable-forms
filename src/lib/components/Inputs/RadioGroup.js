import React, { Component } from 'react';
import Label from '../Structure/Label';

class RadioGroup extends Component {

    constructor(props){
        super(props);
        this.buildRadios = this.buildRadios.bind(this);
    }
    
    render(){
      let style = {};
      return(
          <div className={'radio-group ' + this.props.customClassName + ' '}>
            {this.buildRadios()}
          </div>
      )
    }

    buildRadios() {
      let items = [];
      let style = {};
      let count = 0;
      for(let { label, value, customClassName } of this.props.radios) {
        let item = <input name={this.props.name}
                          type="radio"
                          className={'form-input form-radio ' + (customClassName || '')}
                          value={value}
                          onChange={(event) => this.props.onChange({
                            updated: {
                              [event.target.name]: event.target.value
                            },
                            event: event,
                            target: event.target,
                            value: event.target.value,
                            name: event.target.name
                          })}/>;
        if (label) {
          label['labelClass'] = ((label['labelClass'] && label['labelClass'].includes('radio-label')) ? label['labelClass'] : (label['labelClass'] || '') + ' radio-label');
          item = <Label {...label} key={this.props.name + '-radio-' + count}>
            {item}
          </Label>;
          items.push(item);
        } else {
          items.push(React.cloneElement(item, { key: this.props.name + '-radio-' + count }));
        }
        count++;
      }
      return items;
    }

}

RadioGroup.defaultProps = {
  customClassName: '',
  emptyValue: ''
};

export default RadioGroup;

