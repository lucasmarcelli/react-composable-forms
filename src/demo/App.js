import Form, { Button, Checkbox, Text, Textarea } from '../lib';
import React, { Component } from 'react';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      val: false
    }
  }

  render(){
    return (
      <div>
    <Form onSubmit={console.log}
          initialValues={{ test: 'initial value' }}
          >
      <div>
        {/* You can use whatever structure you want. Don't go too crazy deep though... yet */}
        <div>
      <Text placeholder="Enter a value"
            name="test"
          />
      </div>
      <Textarea placeholder="Some Text"
                name="testtextarea"
      />
      <Text placeholder="Another"
            name="test2"
            label={{
              text: 'With Label:'
            }}
          />
      <Checkbox label={{
        text: 'Check!'
                }}
                name="checktest"
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
