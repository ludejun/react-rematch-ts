import * as React from 'react';
import { connect } from 'react-redux';
import Count from './components/Count';
import logo from './logo.svg';
import './App.css';

interface IAppProps {
  count?: number,
  increment?: () => void,
  incrementAsync?: ()=>void
}

class App extends React.Component<IAppProps> {
  constructor(props:IAppProps) {
    super(props);
  }

  render() {
    const {increment, incrementAsync} = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <p>计数中：{this.props.count}</p>
          <Count onAddClick={increment} onAddAsyncClick={incrementAsync}/>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.count,
});
const mapDispatchToProps = ({count: {increment, incrementAsync}}) => ({
  increment: () => increment(1),
  incrementAsync: () => incrementAsync(1),
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;
