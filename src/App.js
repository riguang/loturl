import React, { Component } from 'react';
//import './App.css';
import UserIndex from './components/UserIndex';
const userIndex = {
  ClassName:["默认收藏","react","mobx"]
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <UserIndex {...userIndex} />
      </div>
    );
  }
}

export default App;