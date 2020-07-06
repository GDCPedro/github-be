/**
 * @param username 用户名
 * @param password 加密后的密码
 */
export interface IUserBaseInfo {
  /**
   * 用户名
   */
  username: string;
  /**
   * 加密后的密码
   */
  password: string;
}

export interface IBaseResponse {
  errorcode: string;
  message: string;
}
