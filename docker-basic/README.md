# Docker 

<br />

## What is Docker?
- docker는 개발자가 애플리케이션을 빠르고 쉽게 배포할 수 있도록 설계된 오픈 소스 컨테이너화 플랫폼
- 컨테이너는 코드, 런타임, 시스템 도구, 시스템 라이브러리 및 설정을 포함하는 표준화된 단위로 각자 다른 컴퓨터 환경에도 일관되게 실행 할 수 있도록 함

<br />

## Docker 동작 원리
1. Docker image : Docker 컨테이너를 생성하는데 사용되는 템플릿으로 애플리케이션 및 실행에 필요한 모든것을 포함
2. Docker container : Docker 이미지를 실행한 인스턴스로 컨테이너는 격리된 환경에서 애플리케이션을 실행
3. Docker Daemon : Docker API 요청을 수신하고 Docker 이미지, 컨테이너, 네트워크 및 볼륨을 관리하는 서비스 
4. Docker client : 사용자가 Docker와 상호 작용 할 수 있게 해주는 CLI

<br />

## Dockerfile 기본 구성 요소

- FROM : 이미지 생성의 기반이 되는 베이스 이미지를 지정
- RUN : 이미지를 빌드하는 동안 실행할 명령어
- CMD : 컨테이너가 시작될 때 실행할 기본 명령어 제공
- EXPOSE : 컨테이너가 리스닝할 포트 지정
- ENV : 환경 변수 설정
- ADD : 파일이나 디렉토리를 이미지에 복사. 원격 URL과 압축 파일의 자동 압출 해제 기능을 지원
- COPY : 파일이나 디렉토리를 이미지에 복사. ADD와 다르게 기본적인 복사 기능만 제공
- VOLUME : 외부에서 접근 가능한 데이터 볼륨 생성
- WORKDIR : 명렁어를 실행할 작업 디렉토리 설정

## Docker 기본 명령어


> docker run : 새 컨테이너를 생성하고 실행

> docker pull : 지정한 이미지를 도커 허브에서 로컬로 가져옴

> docker push : 로컬에서 생성한 이미지를 도커 허브에 업로드

> docker images : 로컬 시스템에 있는 이미지 목록을 표시

> docker ps : 실행 중인 컨테이너 목록을 표시합니다. -a 옵션을 사용하면 중지된 컨테이너도 표시

> docker stop: 실행 중인 컨테이너를 중지

<br />

## DockerFile 기본 설정

```
# Node.js 이미지를 베이스 이미지로 사용
FROM node:20

# 작업 디렉토리 설정
# 해당 경로는 컨테이너의 작업 경로를 의미
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

```