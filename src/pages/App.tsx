import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Count from './components/Count';
import { Dispatch, RootState } from '../store';
import monitor from '../utils/monitor';
import logo from './logo.svg';
import './App.less';

interface IAppProps {
  count?: number;
  increment?: () => void;
  incrementAsync?: () => void;
}

@monitor.track({ type: 'PV', id: '1111' })
class App extends React.Component<IAppProps, {}> {
  constructor(props: IAppProps) {
    super(props);
  }

  // @monitor.track({type: 'MC', id: '2222', custom: {}})
  onLogClick() {
    monitor.trackEv('MC', '333333');
    console.log('LogClick');
  }

  render() {
    const { increment, incrementAsync } = this.props;
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
          <button onClick={this.onLogClick}>点击日志测试</button>
          <p>计数中：{this.props.count}</p>
          <Count onAddClick={increment} onAddAsyncClick={incrementAsync} />

          <Link to="/login" style={{ marginTop: 20 }}>
            到登陆页
          </Link>
        </header>
      </div>
    );
  }
}

const mapStateToProps = ({ count }: RootState) => ({
  count,
});
const mapDispatchToProps = ({ count: { increment, incrementAsync } }: Dispatch) => ({
  increment: () => increment(1),
  incrementAsync: () => incrementAsync(1),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
