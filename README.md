React Composable Forms
=

##### This is a composable, reusable form framework for react, built mostly out of boredem and neccesity.

###### This is also very, very alpha :)

Features done and planned:
====

- [x] Initial Values / Populate
- [x] Text
- [x] Checkbox
- [ ] Radio Buttons
- [ ] Email Field
- [ ] Select w/ multiple
- [x] Buttons
- [ ] Reset Button
- [x] Submit Button    
- [ ] Number Field
- [x] Text Area
- [ ] Custom Components
- [x] Form to manage state
- [ ] Javascript Validators
- [ ] Custom Validators
- [ ] Build Form from Config
- [ ] Tests
- [ ] Optional base CSS
- [ ] PropTypes
- [ ] Documentation
- [ ] Add new elements dynamically
- [x] Labels

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

Don't go too complex yet in structure. Sub-forms/Custom Components is in the 1.0 Roadmap - this will make it really modular.

##### Props

`Function: onSubmit(values)` - Function that receives the form's state on submit. To submit, simple ensure there is a 
`Button` with `submit` set to `true` in the form, or dispatch a `submit` event. The state is based on `[name]: value` for the form elements.

`String: customClassName` - [Optional] A custom css class for the `form` HTML element. The class `composable-form` is on the element by default.

`Function: onChange` - [Optional] This callback will fire on every change in the form, with all the form's contents.

`String: name` - [Optional] Named forms will return their output in an object like: `{[name]: values}`

`Object: initialValues` - [Optional] An object that matches the state of the form (ie, what the returned object looks like internally `{[name]: value}`) Can be partial.

**NOTE:** This only works if you have the initial data *before* you construct the Form. If you need to alter the data after, or you're waiting on a network request or something, see the `Refs - Populate` below.

##### Refs

There is some utility refs provided for simplicity. 

`Function: populate(data)` - Populate will update the form the same way the `initialValues` prop does. Partials allowed. Object must be the same structure as the Form's state, like in `initialValues`.

To use the ref on your form:

``` ecmascript 6
render() {
    <Form onSubmit={callback}
          ref={({ populate }) => this.populate = populate}
          >
          ...
     </Form>     
}

// Some time after construction of the Form, data becomes available, so call:
this.populate(data);
```

##### Usage

See the Demo or Example.

### `Text`

A simple Text input. Can be used outside of a `Form` component.

##### Props

`String: name` - Name of the input field.

`String: placeholder` - [Optional] Placeholder for input. Defaults to 'Enter a Value'.

`String: customClassName` - [Optional] A custom css class for the `input` HTML element. The class `form-input` is on the element by default.

`Object: label` - [Optional] An object specifying a label for the `Text`. Format is:

```
ecmascript 6
{
  text: 'Label Text',
  labelClass: 'custom-css-class',
  textClass: 'custom-css-class'
}
```

##### Props if not a child of `Form`
`String: value` - The current value of the input.

`Function: onChange({event, target, name, value, updated})` - Change handler for when input is entered.

##### Usage

See the Demo or Example.

### `Checkbox`

A checkbox, with label. 

##### Props

`String: name` - Name of the input field.

`Object: label` - An object specifying a label for the `Checkbox`. See `Text` for structure.

`String: customClassName` - [Optional] A custom css class for the `input` HTML element. The class `form-input` is on the element by default.

##### Props if not a child of `Form`
`boolean: checked` - The current checked status of the `Checkbox`.

`Function: onClick({event, target, name, value, updated})` - Click handler for when checkbox changes.

##### Usage

See the demo.

Docs are incomplete still sorry <3

