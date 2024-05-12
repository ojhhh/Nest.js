import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MarkdownService {
  createMarkdown(subject: string, text: string) {
    const date = new Date();
    const dirPath = path.join(__dirname, '../../markdowns', `${subject}`);

    // 디렉토리가 존재하지 않을 경우 생성
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // 파일 이름에 사용할 수 없는 'undefined'를 피하고, 올바른 파일명을 생성
    const fileName = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}_${subject}.md`;
    const filePath = path.join(dirPath, fileName);

    fs.writeFileSync(filePath, text, 'utf8');
  }
}
