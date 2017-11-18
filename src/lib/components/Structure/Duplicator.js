import React, { Component } from 'react';
import FormSection from './FormSection';
import asInternalComponent from '../Helpers/asInternalComponent';
import { buildInitial, Button } from '../../index';

const DuplicatorRow = asInternalComponent(FormSection, { customName: 'DuplicatorRow' });

class Duplicator extends Component {
    
    constructor(props){
        super(props);
        let count = this.props.values.length;
        this.fields = React.Children.toArray(props.children);
        let { values } = buildInitial(this.fields);
        this.emptyRow = values;
        let initialValues = Array(count).fill(this.emptyRow);
        for(let initial of props.values) {
          initialValues[props.values.indexOf(initial)] = { ...this.emptyRow, ...initial };
        }

        this.props.setInitial && this.props.setInitial(initialValues, this.props.name);

        this.renderRows = this.renderRows.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.remove = this.remove.bind(this);
    }

    render(){
        return(
            <div className={'form-duplicator ' + this.props.customClassName}>
                {this.renderRows(this.props.values)}
            </div>
        )
    }
    
    handleChange({ updated, ...rest }) {
     let index = parseInt(Object.keys(updated)[0]);
     let rowUpdate = Object.values(updated)[0];
     if(index === this.props.values.length){
       updated = [...this.props.values, { ...this.emptyRow }]
     } else {
       updated = [...this.props.values];
     }
     updated[index] = rowUpdate;
     updated = { [this.props.name]: updated };
     this.props.onChange({ updated, ...rest });
    }

    renderRows(values){
      values = Object.values(values);
      let items = [];
      let counter = 0;
      for(counter; counter < values.length; counter++) {
        items.push(React.createElement(DuplicatorRow, {
          name: counter,
          key: 'duplicator-row-' + counter,
          values: values[counter],
          onChange: this.handleChange
        }, [...this.fields,  (<Button key="delete"
                                      name={counter}
                                      text={this.props.removeText}
                                      onClick={this.remove}/>)]))
      }
      items.push(React.createElement(DuplicatorRow, {
        name: values.length,
        key: 'duplicator-row-' + values.length,
        values: this.emptyRow,
        onChange: this.handleChange
      }, [...this.fields]));
      return items;
    }

    remove(event) {
      event.preventDefault();
      let values = [];
      // Splice somehow fucks this up hardcore idk.
      for(let i = 0; i < this.props.values.length; i++) {
        i !== parseInt(event.target.name) && values.push(this.props.values[i])
      }
      let updated = { [this.props.name]: values };
      this.props.onChange({ updated, ...event });
    }

}

Duplicator.defaultProps = {
  attachOnComponentChange: true,
  customClassName: '',
  initialValues: [],
  emptyValue: [],
  removeText: 'Remove'
};

export default Duplicator;
