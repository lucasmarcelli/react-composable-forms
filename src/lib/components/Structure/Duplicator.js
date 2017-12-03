import { Button } from '../../index';
import React, { Component } from 'react';
import FormSection from './FormSection';
import PropTypes from 'prop-types';
import asInternalComponent from '../Helpers/asInternalComponent';
import { buildInitial, validateOutOfForm } from '../Helpers/formUtils';


const DuplicatorRow = asInternalComponent(FormSection, { customName: 'DuplicatorRow' });
DuplicatorRow.propTypes = { name: PropTypes.number };

class Duplicator extends Component {
    
    constructor(props){
        super(props);
        let count = this.props.values.length;
        this.state = {
          rows: count
        };
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
        let add = (this.props.pressToAdd && this.state.rows === this.props.values.length) ? <Button text={this.props.addText} onClick={(event) => {this.setState({ rows: ++this.state.rows })}}/> : null;
        return(
            <div className={'form-duplicator ' + this.props.customClassName}>
                {this.renderRows(this.props.values)}
                {add}
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
      let emptyRow = this.props.pressToAdd ? [...this.fields, (<Button key="delete" name={values.length} text={this.props.removeText} onClick={this.remove}/>)] : [...this.fields];
      for(counter; counter < values.length; counter++) {
        let fields = this.props.singleRemove ? [...this.fields] : [...this.fields,  (<Button key="delete" name={counter} text={this.props.removeText} onClick={this.remove}/>)];
        items.push(React.createElement(DuplicatorRow, {
          name: counter,
          key: 'duplicator-row-' + counter,
          values: values[counter],
          onChange: this.handleChange
        }, fields))
      }
      if(!this.props.pressToAdd || (this.props.pressToAdd && values.length === this.state.rows - 1)) {
        items.push(React.createElement(DuplicatorRow, {
          name: values.length,
          key: 'duplicator-row-' + values.length,
          values: this.emptyRow,
          onChange: this.handleChange
        }, emptyRow));
      }
      return items;
    }

    remove(event) {
      event.preventDefault();
      if(this.props.pressToAdd) {
        this.setState({ rows: --this.state.rows });
      }
      console.log(event.target.name)
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
  emptyValue: [],
  removeText: 'Remove',
  addText: 'Add Another'
};

Duplicator.propTypes = {
  name: PropTypes.string.isRequired,
  attachOnComponentChange: PropTypes.bool.isRequired,

  values: (props, propname, component) => validateOutOfForm(props, propname, component, null, [].constructor.name),
  onChange: (props, propname, component) => validateOutOfForm(props, propname, component, 'Function'),

  emptyValue: PropTypes.array.isRequired,
  setInitial: PropTypes.func,
  customClassName: PropTypes.string,
  noForm: PropTypes.bool,
  addText: PropTypes.string,
  removeText: PropTypes.string
};

export default Duplicator;
