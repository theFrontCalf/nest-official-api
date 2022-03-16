import type { CipherKey, BinaryLike } from 'crypto';
import { createHmac, createCipheriv, createDecipheriv } from 'crypto';

const aesStatic = 'aes-192-cbc';
const aseIV = Buffer.from(aesStatic).toString('base64');
// 生成摘要
export const hmacSha256 = (str: string) => {
  return createHmac('sha256', str).digest('hex');
};
// 生成base64 str
export const base64 = (str: any) => {
  return Buffer.from(str).toString('base64');
};

// 加解密数据-加密
export const aesEncrypt = (
  data: string,
  key: string,
  iv: BinaryLike = aseIV,
) => {
  // 给定的算法，密钥和初始化向量（iv）创建并返回Cipher对象
  // Key length is dependent on the algorithm. In this case for aes192, it is 24 bytes (192 bits).
  const bufKey = Buffer.alloc(24, key, 'utf-8');
  const cipher = createCipheriv(aesStatic, bufKey, iv);
  // 指定要摘要的原始内容,可以在摘要被输出之前使用多次update方法来添加摘要内容
  // 数据的编码 utf8 返回值的编码 hex
  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

export const aesDecrypt = (
  data: string,
  key: string,
  iv: BinaryLike = aseIV,
) => {
  // 给定的算法，密钥和初始化向量（iv）创建并返回Cipher象
  // 数据的编码 hex 返回值的编码 utf8
  const bufKey = Buffer.alloc(24, key, 'utf-8');
  const decipher = createDecipheriv(aesStatic, bufKey, iv);
  let decrypted = decipher.update(data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
