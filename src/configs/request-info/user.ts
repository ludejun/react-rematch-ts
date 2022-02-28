export interface Login {
  request: {
    loginName: string;
    loginPwd: string;
  };
  response:
    | {
        userName: string; // 花名
        loginCustNo: string;
        token: string;
        headUrl: string;
        realName: string; // 真名
        englishName: string; // 英文名
        teamName: string; // 团队名
        key?: string; // 计算签名使用
      }
    | undefined;
}
