import Form, { Button, Checkbox, Duplicator, FormSection, Select, Text, Textarea } from '../lib';
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
              structure={[1, 2, 1, [2], [2, 1], 1, 1]}
        >
          <Select name="select-1" options={[
            {
              text:'a',
              value:1
            }, {
              text:'b',
              value:2
            }, {
              text:'c',
              value:3
            }, {
              text:'d',
              value:4
            }
          ]

          }
          label={{ text: 'Select One' }}/>
          <Text name="text-2" label={{ text: 'Enter' }}/>
          <Text name="text-3" label={{ text: 'Enter' }}/>
          <Textarea name="text-4" label={{ text: 'Enter' }}/>
          <Duplicator name="dup-1">
            <Text name="asd" label={{ text: 'Enter' }}/>
            <Text name="asd-2"/>
          </Duplicator>
          <FormSection name="fs-1">
            <Text name="text-6" label={{ text: 'Enter' }}/>
            <Text name="text-7"/>
            <Text name="asd"/>
          </FormSection>
          <Checkbox name="check" label={{ text: 'Enter' }}/>
          <Button submit={true}/>
        </Form>
      </div>
    );
  }
}

export default App;
