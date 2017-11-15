import React, { Component } from 'react';
import { Text } from '../lib';

class SomeComponent extends Component {
    
    constructor(props){
        super(props);
    }

    render() {
      return (
        <div>
          <Text name="val1"/>
          <Text name="val2"/>
        </div>
      )
    }

}

export default SomeComponent;
