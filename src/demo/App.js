import Form, { Button, Checkbox, Duplicator, Email, FormSection, MomentDate, Num, Password, RadioGroup, Select, Text, Textarea } from '../lib';
import React, { Component } from 'react';
import Date from '../lib/components/Inputs/Date';
import ErrorBoundary from '../lib/components/Helpers/ErrorBoundary';
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
        <ErrorBoundary>
        <Form onSubmit={console.log}
              structure={[[2, 1], 1, null, 1]}
        >
          <RadioGroup name="radio" radios={[
            {
              value: '1'
            },
            {
              label: { text: 'Click 2' },
              value: '2'
            },
            {
              label: { text: 'Click 23' },
              value: '3'
            }
          ]} />
          <Date name="date"/>
          <Duplicator name={'asd'}>
            <Textarea name="asdsss"/>
          </Duplicator>
          <Button submit={true}/>
        </Form>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
