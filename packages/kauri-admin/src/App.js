import React, { Component } from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './components/Main'
import Configuration from './components/Configuration'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      config: new Configuration(),
      updateLoadingFlag: this.updateLoadingFlag.bind(this),
      loading: false
    };
  }

  updateLoadingFlag(loading) {
    this.setState({ loading: loading })
  }

  render() {
    return (
      <div className="App">
        <Header loading={this.state.loading} />
        <Main {...this.state} />
        <Footer {...this.state} />
      </div>
    );
  }
}

export default App;
