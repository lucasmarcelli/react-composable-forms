import Form, { Button, Checkbox, Duplicator, FormSection, Text } from '../lib';
import React, { Component } from 'react';
class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Form onSubmit={console.log}
              initialValues={{ 'duplicator-test': [{ 'duplicator-text': 'aa' }, { 'duplicator-text-1':'bb' }], 'section-test': { 'text-section-test': 'aaa' }}}

        >
          <Duplicator name="duplicator-test">
            <Text name="duplicator-text"/>
            <Text name="duplicator-text-1"/>
          </Duplicator>
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
