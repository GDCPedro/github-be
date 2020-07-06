import { IBaseResponse } from "./../components/auth/types.d";
import { HttpException, HttpStatus } from "@nestjs/common";

/**
 * Get请求处理成功后，向客户端返回的信息
 */
export class GetException extends HttpException {
  constructor(res: IBaseResponse) {
    super(res, HttpStatus.OK);
  }
}

/**
 * Post请求处理成功后，向客户端返回的信息
 */
export class PostException extends HttpException {
  constructor(res: IBaseResponse) {
    super(res, HttpStatus.CREATED);
  }
}
