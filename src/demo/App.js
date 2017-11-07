import Form, { Button, Text  } from '../lib';
import React, { Component } from 'react';

class App extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
    <Form onSubmit={console.log}>
      <Text placeholder="Enter a value"
            name="test"
          />
      <Button submit={true}
              name="submit"
          />
    </Form>
    )
  }
}
export default App;
