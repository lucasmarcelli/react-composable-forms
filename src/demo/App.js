import Form, { Button, Checkbox, Select, Text, Textarea } from '../lib';
import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      val: false
    };
  }

  render() {
    return (
      <div>
        <Form onSubmit={console.log}
              initialValues={{ test: 'initial value' }}
        >
          <div>
            {/* You can use whatever structure you want. Don't go too crazy deep though... yet */}
            <Select name="testselect"
                    label={{
                      text: 'Labeled'
                    }}
                    options={[
                      {
                        value: 'Test!',
                        text: 'Test!'
                      },
                      {
                        value: 'Cool',
                        text: 'Cool'
                      }
                    ]}/>
            <div>
              <Text placeholder="Enter a value"
                    name="test"
              />
            </div>
            <Select multiple={true}
                    options={[{
                        value: 'multiple!',
                        text: 'multiple!'
                      },
                      {
                        value: 'options',
                        text: 'options'
                      },
                      {
                        value: 'cool',
                        text: 'cool'
                      }
                    ]}
                    name="multi-select"
            />

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
            <Button reset={true}
                    name="reset"
                    />
          </div>
        </Form>
        {/* No Form, so onChange has to be provided. */}
        <Text onChange={console.log}
              name="test3"
        />
      </div>

    );
  }
}

export default App;
