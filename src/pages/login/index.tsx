import * as React from 'react';
import { connect } from 'react-redux';
import { DispatchPro, RootState } from '@/store';
import Storage from '@/utils/Storage';
import './index.less';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type ILoginProps = StateProps & DispatchProps;
class Login extends React.Component<ILoginProps> {
  constructor(props: ILoginProps) {
    super(props);
  }

  onLoginClick() {
    const { fetchLogin } = this.props;

    fetchLogin({
      data: {
        loginName: '',
        loginPwd: '***'
      },
      cb: (userInfo: object) => {
        Storage.set('userinfo', userInfo);
      }
    });
  }

  render() {
    const { isAuth, isLogining, userInfo } = this.props;
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
  userInfo: user.userInfo
});
const mapDispatchToProps = ({ user: { fetchLogin } }: DispatchPro): any => ({
  fetchLogin
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
