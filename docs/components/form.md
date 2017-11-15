# `Form`

#### Description
Manages the state of children Form components. 

You can have whatever HTML structure you want, the `Form` component looks for components that need managing and attaches handlers, to an extent. 

#### Props

`Function: onSubmit(values)` - Function that receives the form's state on submit. To submit, simply ensure there is a 
`Button` with `submit` set to `true` in the form, or dispatch a `submit` event. The state is based on `[name]: value` for the form elements.

`Function: onReset(values)` - [Optional] Function that will receive the `Form` state on a reset event, if you'd like to track what it contained before reset. Use it with a `Button` that has the prop `reset` set to truthy.

`String: customClassName` - [Optional] A custom css class for the `form` HTML element. The class `composable-form` is on the element by default.

`Function: onChange` - [Optional] This callback will fire on every change in the form, with all the form's contents.

`String: name` - [Optional] Named forms will return their output in an object like: `{[name]: values}`

`Object: initialValues` - [Optional] An object that matches the state of the form (ie, what the returned object looks like internally `{[name]: value}`) Can be partial.

**NOTE:** This only works if you have the initial data *before* you construct the Form. If you need to alter the data after, or you're waiting on a network request or something, see [`Populate`](#refs) below.

#### Refs

`Function: populate(data)` - Populate will update the form the same way the `initialValues` prop does. Partials allowed. Object must be the same structure as the Form's state, like in `initialValues`.
