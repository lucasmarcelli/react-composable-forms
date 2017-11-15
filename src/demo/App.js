import Form, { Button, Checkbox, FormSection, Text } from '../lib';
import React, { Component } from 'react';
class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Form onSubmit={console.log}
              initialValues={ { 'section-test': { 'text-section-test': 'initial value' }}}
        >
          <FormSection name="section-test">
            <Text name="text-section-test"
                  label={{ text: 'label-test' }}
            />
            <Text name="text-section-test-1"/>
            <Checkbox name="checkbox-section-test"/>
          </FormSection>
          <div>
            <Text name="text-test"
                  label={{ text: 'label-test' }}
            />
          </div>
          <Checkbox name="checkbox-test"/>
          <Button submit={true}/>
          <Button reset={true}/>
        </Form>
      </div>
    );
  }
}

export default App;
