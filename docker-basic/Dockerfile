# Node.js 이미지를 베이스 이미지로 사용
FROM node:20

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 의존성 파일 복사
COPY package*.json ./

# 프로젝트 의존성 설치
RUN npm install

# 프로젝트 소스 복사
COPY . .

# 앱 빌드
RUN npm run build

# 앱 실행
CMD ["npm", "run", "start:prod"]
