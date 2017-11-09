import React, { Component } from 'react';
import Form from '../../index';

class RowGenerator extends Component {
    
    constructor(props){
        super(props);
        console.log(React.Children.toArray(this.props.children));
        this.handleChange = this.handleChange.bind(this);
    }
    
    render(){
          return (
            <Form customClassName={this.props.customClassName}
                  onChange={this.handleChange}
                  name={this.props.name}
                  attachOnChange={false}
            >
            </Form>
          )
    }

    handleChange(change) {
      console.log(change);
    }

}

RowGenerator.defaultProps = {
  customClassName: '',
  attachOnChange: true,
  initialValues: {}
};

export default RowGenerator;
