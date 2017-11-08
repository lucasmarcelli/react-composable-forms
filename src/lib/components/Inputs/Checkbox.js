import React, {Component} from 'react';

class Checkbox extends Component {

  render() {
    return (
      <input type="checkbox"
             checked={this.props.checked}
             name={this.props.name}
             className={'form-checkbox ' + (this.props.customClassName || '')}
             onClick={(event) => this.props.onChange({
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

export default Checkbox;
