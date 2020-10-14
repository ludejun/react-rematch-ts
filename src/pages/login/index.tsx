import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, RootState } from '../../store';
import Storage from '../../utils/Storage';
import './index.less';

interface ILoginProps {
  isAuth?: boolean;
  isLogining?: boolean;
  userInfo?: any;
  fetchLogin?: (payload: object) => void;
}

class Login extends React.Component<ILoginProps, {}> {
  constructor(props: ILoginProps) {
    super(props);
  }

  onLoginClick() {
    const { fetchLogin } = this.props;

    fetchLogin &&
      fetchLogin({
        data: {
          loginName: '',
          loginPwd: '***',
        },
        cb: (userInfo: object) => {
          Storage.set('userinfo', userInfo);
        },
      });
  }

  render() {
    const { isAuth, isLogining, userInfo, fetchLogin } = this.props;
    return (
      <div className="login">
        <button onClick={() => this.onLoginClick()}>登陆</button>
        {isLogining && <p>登陆中...</p>}
        <p>
          登陆状态：{isAuth ? <span>已登陆，欢迎{userInfo.username}</span> : <span>您未登陆</span>}
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ user }: RootState) => ({
  isAuth: user.isAuth,
  isLogining: user.isLogining,
  userInfo: user.userInfo,
});
const mapDispatchToProps = ({ user: { fetchLogin } }: Dispatch) => ({
  fetchLogin,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
