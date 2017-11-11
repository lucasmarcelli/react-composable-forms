import React, { Component } from 'react';
import { Text } from '../lib';

class SomeComponent extends Component {
    
    constructor(props){
        super(props);
        // The only reason you should have a custom component over a form section or another builtin is if your component needs state for some reason.
        this.state = {
          someflag: false
        };
    }

    render() {
      return (
        <div>
          {/*Values should still be sent up and received as props from above where possible - one source of truth reduces bugs. */}
          <Text name="val1"/>
          <Text name="val2"/>
        </div>
      )
    }

}

export default SomeComponent;
