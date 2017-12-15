import React, { Component } from 'react';

class ErrorBoundary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errormessage: 'Something is wrong in the form.'
    }
  }

  componentDidCatch(error, errorInfo) {
    let message = this.state.errormessage;
    switch(error.code) {
      case 'EOPDEPERR':
        message = 'An optional dependency is not installed. ' + error.message;
        break;
      default:
        message = 'Something is wrong in the form.'
    }
    this.setState({
      error: error,
      errorInfo: errorInfo,
      hasError: true,
      errormessage: message
    });
  }

  render() {
    if(this.state.hasError) {
      return <h1 className="thrown-error">{this.state.errormessage}</h1>
    } else {
      return React.cloneElement(this.props.children, { size: this.props.size });
    }
  }

}

export default ErrorBoundary;
