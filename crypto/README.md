## 문자열 암호화 후 복호화

- 프로젝트를 진행하며 url에 담겨있는 id 값에 대한 암호화가 필요하다고 판단하여 id를 넘겨줄때 암호화 하고 받을때 복호화하여 사용하는 방법을 고민
- nestjs에 내장되어 있는 crypto 사용

<br />

## 암호화

### app.controller.ts

```js
  @Get('/link/:id')
  getId(
    @Param('id') id : string
  ) {
    return this.appService.encrypt(id);
  }
```
- 정수를 암호화 하기 위해선 별도의 설정을 추가해주어야 하기 때문에 간단하게 실습하기 위해 문자열로 전달

<br />

### app.service.ts

```js
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
      const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.secretKey), this.iv);
      let encrypted = cipher.update(id);
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      return this.iv.toString('hex') + ':' + encrypted.toString('hex');
    } catch (error) {
      console.log(error)
    }
  }
}
```
<br />
<br />

## 복호화 

### app.controller.ts

```js
  @Get("/:text")
  getTextById(
    @Param('text') text : string
  ) {
    return this.appService.decrypt(text)
  }
```

### app.service.ts

```js
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto'

@Injectable()
export class AppService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly secretKey = `${process.env.SECRET_HASH_KEY}`; // 32자리의 문자열
  private readonly iv = crypto.randomBytes(16);
  
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

```
<br />
<br />

## 실행 결과

> GET : http://localhost:3000/link/test

```js
// 'test'에 대한 문자열 암호화
1f9a53ac906e8acd18c33fa8de71884b:bdca6594b0f8bc878734ac7c2b87dc94
```

> GET : http://localhost:3000/1f9a53ac906e8acd18c33fa8de71884b:bdca6594b0f8bc878734ac7c2b87dc94

```js
// 복호화된 결과 출력
> test
```