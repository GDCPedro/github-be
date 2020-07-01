export interface IUserBaseInfo {
  username: string;
  password: string;
}

export interface IBaseResponse {
  errorcode: string;
  message: string;
}

export interface IJwtInfo {
  username: string;
  id: number | string;
}
