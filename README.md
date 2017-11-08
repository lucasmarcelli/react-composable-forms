React Composable Forms
=

##### This is a composable, reusable form framework for react, built mostly out of boredem and neccesity.

###### This is also very, very alpha :)

Features done and planned:
====

- [x] Text
- [ ] Email
- [x] Select w/ multiple
- [x] Button
- [ ] Number Field
- [ ] Text Area
- [ ] Custom Components
- [x] Form
- [ ] Javascript Validators
- [ ] Custom Validators
- [ ] Build Form from Config
- [ ] Tests
- [ ] Optional base CSS
- [ ] PropTypes
- [ ] Documentation
- [ ] Add new elements dynamically

## Quick Start

`yarn add react-composable-forms`

``` ecmascript 6
import Form, { Text, Button } from 'react-composable-forms';`

...
<Form onSubmit={console.log}>
      <Text placeholder="Enter a value"
            name="test"
          />
      <Button submit={true} 
              name="submit"
          />
    </Form>
...
```

Clicking the `Button` in the above example, would return the text to the callback for the `onSubmit` prop.

The `Form` will return whatever it's children's values are to the callback, with their `name` as the key.

You can use the each component by itself as well, outside of a `Form`, by supplying more props, and treating it similarly to a naked react form input.

``` ecmascript 6
<Text placeholder="Enter a value"
      name="test"
      value={this.state.test}
      onChange={({event, target, name, value, updated}) => this.setState([name]: value)}}
      />
``` 

`updated` has a structure the same as `[name]: value`.

## Components

### `Form`

Manages the state of children Form components. 

You can have whatever HTML structure you want, the `Form` component looks for components that need managing and attaches handlers.

##### Props

`Function: onSubmit(values)` - Function that receives the form's state on submit. To submit, simple ensure there is a 
`Button` with `submit` set to `true` in the form, or dispatch a `submit` event. The state is based on `[name]: value` for the form elements.

`String: customClassName` - [Optional] A custom css class for the `form` HTML element. The class `composable-form` is on the element by default.

`Function: onChange` - [Optional] This callback will fire on every change in the form, with all the form's contents.
##### Usage

See the Example above.

### `Text`

A simple Text input. Can be used outside of a `Form` component.

##### Props

`String: name` - Name of the input field.

`String: placeholder` - [Optional] Placeholder for input. Defaults to 'Enter a Value'.

`String: className` - [Optional] A custom css class for the `input` HTML element. The class `form-input` is on the element by default.

##### Props if not a child of `Form`
`String: value` - The current value of the input.

`Function: onChange({event, target, name, value, updated})` - Change handler for when input is entered.

##### Usage

See the example above.

Docs are incomplete sorry <3

