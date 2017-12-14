import Form, { Button, Checkbox, Date, Duplicator, FormSection, Select, Text, Textarea } from '../lib';
import React, { Component } from 'react';
class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{
        width: 700,
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <Form onSubmit={console.log}
              structure={[3, 1, null, 2]}
        >
          <Date name="date-1"/>
          <Text name="text-2" label={{ text: 'Enter' }}/>
          <Text name="text-3" label={{ text: 'Enter' }}/>
          <Textarea name="text-4" label={{ text: 'Enter' }}/>
          <Duplicator name="dup-1">
            <Text name="asd" label={{ text: 'Enter' }}/>
            <Text name="asd-2"/>
          </Duplicator>
          <Checkbox name="check" label={{ text: 'Enter' }}/>
          <Button submit={true}/>
        </Form>
      </div>
    );
  }
}

export default App;
