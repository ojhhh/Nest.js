import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto'

@Injectable()
export class AppService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly secretKey = `${process.env.SECRET_HASH_KEY}`; // 32자리의 문자열
  private readonly iv = crypto.randomBytes(16);

  // 넘어온 id 암호화 하기
  encrypt(id: string): string {
    try {
      /*  
        secretKey를 32바이트로 안하고 대충 써놨더니 오류나서 해당 key의 길이를 체크하기 위해 사용
        const key = crypto.createHash('sha256').update(String(this.secretKey)).digest('base64').substr(0, 32);
        console.log(key)

        Error : 
          RangeError: Invalid key length
          ...
          code: 'ERR_CRYPTO_INVALID_KEYLEN'
      */
      const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.secretKey), this.iv);
      let encrypted = cipher.update(id);
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      return this.iv.toString('hex') + ':' + encrypted.toString('hex');
    } catch (error) {
      console.log(error)
    }
  }

  // 넘어온 해시 decode
  decrypt(text: string) {
    try {
      const textParts = text.split(':');
      const iv = Buffer.from(textParts.shift(), 'hex');
      const encryptedText = Buffer.from(textParts.join(':'), 'hex');
      const decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.secretKey), iv);
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return decrypted.toString();
    } catch (error) {
      console.log(error);
    }
  }
}
