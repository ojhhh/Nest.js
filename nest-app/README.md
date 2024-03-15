# Nestjs 기본 구조 정리부터 간단한 게시판 만들기까지

- 블로그에 기본 구조부터 게시판 만들기까지 과정을 정리하여 업로드하기 위한 프로젝트 파일

<br />

## Nestjs의 기본 구조 정리

- https://dbdj.tistory.com/61
- 기본적으로 클라이언트에서 서버로 요청을 할때 어떤식으로 데이터가 흘러가는지에 대한 설명

<br />

## Exception Filters

- https://dbdj.tistory.com/62
- 예외처리에 대한 기본 구조 설명
- 자주 쓰이는 HTTP 상태 코드 정리
- Method scope, Controller scope, Global scope에 대한 설명

<br />

## Pipes

- https://dbdj.tistory.com/63
- Pipes에 대한 기본 구조 및 데이터 처리 로직
- 내장 메소드에 대한 정보 정리
- Method level pipe, Global pipe에 대한 기본 코드 및 설명

<br />

## Guards

- https://dbdj.tistory.com/64
- 사용자 권한과 검증에 대한 guard 기본 문법 및 구조 설명
- 더미 객체를 사용하여 인증과 검증에 대한 예시 작성

## Interceptors

- https://dbdj.tistory.com/65
- 인터셉트는 전처리와 후처리를 거침
- 로깅, 캐시, 예외 매핑을 할 수 있지만 해당 실습에선 응답 객체 매핑에 대해 진행
- interceptor에서 응답 객체를 가공할때 사용한다고만 생각하고 접근했는데 생각보다 복잡해서 놀랬음

## Middleware

- https://dbdj.tistory.com/66
- Middleware가 무엇인지 어떻게 실행되는지에 대한 흐름 정리
