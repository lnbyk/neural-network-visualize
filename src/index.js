import React, { Component } from 'react';
import { render } from 'react-dom';
import Routes from './routes';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>

        <p>
          Start editing to see some magic happen :)
        </p>
      </div>
    );
  }
}

render(<Routes />, document.getElementById('root'));
