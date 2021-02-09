import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Count from './components/Count';
import { Dispatch, RootState } from '../store';
import monitor from '../utils/monitor';
import logo from './logo.svg';
import './App.less';

interface IAppProps {
  number?: number;
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

  incrementAsync = () => {
    this.props.increment({
      params: {
        num: 1,
      },
      apiName: 'login',
    });
  };

  render() {
    const { increment } = this.props;
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
          <p>计数中：{this.props.number}</p>
          <Count onAddClick={increment} onAddAsyncClick={this.incrementAsync} />

          <Link to="/login" style={{ marginTop: 20 }}>
            到登陆页
          </Link>
        </header>
      </div>
    );
  }
}

const mapStateToProps = ({ count }: RootState) => ({
  number: count.number,
});
const mapDispatchToProps = ({ count: { increment, incrementAsync } }: Dispatch) => ({
  increment,
  incrementAsync,
});
// const mapDispatchToProps = (dispatch: Dispatch) => {
//   console.log(2222, dispatch);
//   dispatch({type: 'count/increment', })
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);
