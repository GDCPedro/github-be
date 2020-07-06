import { AES, enc } from "crypto-ts";

export default class Crypto {
  /**
   * 加密要用的key
   * 这个要对上前端的加密key
   */
  key = "guodongchao";

  constructor(key?: string) {
    this.key = key || this.key;
  }

  /**
   * 将字符串加密
   * @param str 要加密的字符串
   * @returns 加密后的码
   */
  encryptoStr(str: string): string {
    return AES.encrypt(str, this.key).toString();
  }

  /**
   * 解密
   * @param encryptedStr 被加密的码
   * @returns 被加密的信息
   */
  decryptoStr(encryptedStr: string): string {
    return AES.decrypt(encryptedStr, this.key).toString(enc.Utf8);
  }
}
