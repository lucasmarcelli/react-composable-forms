# React Composable Forms

The intention of `react-composable-forms` is to provide a modular, composable, and customizable form component for React.
Forms are created using a `<Form>` component, and many provided sub components, or, you can use the components on their own.

##### Install:
`yarn add react-composable-forms` or `npm install react-composable-forms --save`

Since this is pre 1.0.0, don't forget to put "latest" in your dependencies if you are planning to keep using this, or you wont get new features as they are added.

##### Quick Start:

``` jsx
import Form, { Text, Button } from 'react-composable-forms';

// In render
<Form onSubmit={console.log}>
    <Text name="text-box-1"
          placeholder="Enter some text" />
    <Button submit={true}/>       
</Form>
```

Clicking the button would print `{text-box-1: ''}` to the console, or whatever text is inputted instead.

You can also use the components outside of a `<Form>`, but you have to provide a function as props for `onChange` and pass the value as props to `value`:

``` jsx
<Text name="text"
      value={this.state.text}
      onChange={({ updated }) => this.setState(updated)/>
      
```

Each input event would fire the state change, or whatever function is passed, so you are responsible for controlling the component like it's just an `<input/>` html field.

## Components

#### [`<Form/>`](components/form.md) 
#### `<FormSection/>`
#### `<Text/>`


