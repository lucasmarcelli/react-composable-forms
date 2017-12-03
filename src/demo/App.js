import Form, { Button, Checkbox, Duplicator, FormSection, Text, Select } from '../lib';
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
          <Select name="test"
                  options={[{
                    value: 0,
                    text: 'asd'
                  }]}
                  />
          <Duplicator name="duplicator-test" pressToAdd={true}>
            <Text name="duplicator-text"/>
            <Text name="duplicator-text-1"/>
          </Duplicator>
          <FormSection name="section-test">
            <Text name="text-section-test"
                  label={{ text: 'label-test' }}
            />
            <Text name="text-section-test-1"/>
            <Checkbox name="checkbox-section-test"/>
            <FormSection name="section-section">
              <Text name="asd"/>
            </FormSection>
          </FormSection>
          <Text name="text-test"
                  label={{ text: 'label-test' }}/>
          <Checkbox name="checkbox-test"/>
          <Button submit={true}/>
          <Button reset={true}/>
        </Form>
        <FormSection name="asd" noForm values={{}} onChange={()=>{}}>
          <Text name="asd"/>
        </FormSection>
      </div>
    );
  }
}

export default App;
