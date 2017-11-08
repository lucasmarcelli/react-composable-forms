import Form, { Button, Text  } from '../lib';
import React, { Component } from 'react';

class App extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
    <Form onSubmit={console.log}>
      <div>
        <div>
      <Text placeholder="Enter a value"
            name="test"
          />
      </div>
      <Text placeholder="Another"
            name="test2"
          />
      <Button submit={true}
              name="submit"
          />
      </div>
    </Form>
        {/* No Form, so onChange has to be provided. */}
        <Text onChange={console.log}
              name="test3"
          />
      </div>

    )
  }
}
export default App;
