# NodeJS

### Ignition

Ignition은 V8 엔진에서 사용되는 인터프리터입니다. JavaScript 코드를 받아서 기계어로 변환하지 않고, 바로 실행 가능한 중간 형태인 바이트코드로 변환합니다. 이 바이트코드는 V8 엔진 내부에서 더 빠르게 처리될 수 있도록 설계되었습니다.

- Byte Code

### Turbofan

TurboFan은 V8의 고급 최적화 컴파일러입니다. JavaScript 코드의 실행 패턴을 분석하고, 자주 사용되는 코드를 특별히 최적화하여 성능을 향상시킵니다. TurboFan은 실행 중인 코드의 "핫 스팟"이라 불리는 부분을 식별하여, 그 부분만을 대상으로 기계어로 컴파일하는 방식으로 작동합니다.

- Machine Code
- turbofan을 이용해서 자주 사용되는 코드를 Machine Code로 최적화해서 컴파일
- 해당 코드는 최적화 된 상태에서 반복적으로 사용 가능
- 만약에 최적화가 잘못되었거나 더 이상 필요없어지면 다시 byte code로 변환

### 인터프리터만 설치된다?

V8 엔진은 인터프리터(예: Ignition)만 설치된 것이 아니라, JIT 컴파일러(예: TurboFan)도 함께 포함하고 있습니다. 이는 코드를 처음 실행할 때는 인터프리터를 통해 빠르게 실행하고, 자주 사용되는 코드를 대상으로 JIT 컴파일러가 최적화하여 재컴파일함으로써 더 빠른 실행 속도를 제공합니다.

### javascript는 bype code만 사용

JavaScript는 전통적으로 인터프리터 언어로 분류되지만, 현대의 JavaScript 엔진은 퍼포먼스를 위해 바이트 코드를 사용합니다. JavaScript 코드는 V8 엔진에서 바이트 코드로 컴파일되고, 이 바이트 코드는 다시 기계어로 컴파일되는 과정을 거칩니다. 따라서, JavaScript 코드 자체는 바이트 코드만을 사용하는 것은 아니며, 최종적으로는 기계어로 변환됩니다.

### just in time compilation (jit) v8

V8 엔진에서의 JIT 컴파일레이션은 코드의 실행 속도를 향상시키는 핵심 기능 중 하나입니다. 코드가 실행될 때 인터프리터에 의해 바이트 코드로 변환되고, 이 바이트 코드는 필요에 따라 JIT 컴파일러를 통해 최적화된 기계어로 컴파일됩니다. 이 과정은 실행 중에 이루어지므로 "Just-In-Time"이라고 불립니다. 이를 통해, 자주 사용되는 코드는 더 빠르게 실행되며, 프로그램의 전반적인 성능이 향상됩니다.

### 싱글 쓰레드의 콜 스택

JavaScript의 콜 스택은 코드가 실행되는 과정에서 함수의 호출을 기록하는 스택 구조입니다. JavaScript는 멀티 쓰레드 언어와 달리 하나의 콜 스택을 사용하며, 이는 한 시점에 단 하나의 함수만 실행될 수 있음을 의미합니다. 이것이 "싱글 쓰레드"라고 부르는 가장 큰 이유입니다.

- 가장 처음 요청 받는 컴포넌트는 이벤트 루프. 이 이벤트 루프는 싱글 쓰레드
- blocking : 시간이 오래 걸리는 요청
- non-blocking 요청 같은 경우 이벤트 루프에서 바로 처리해서 클라이언트에 보내주지만 blocking 요청 같은 경우 Worker Thread에서 처리하고 처리된 요청을 이벤트 루프가 클라이언트로 보냄

### 이벤트 루프와 비동기 처리

JavaScript가 싱글 쓰레드로만 작동한다면, 네트워크 요청이나 파일 I/O 작업과 같은 시간이 오래 걸리는 작업을 처리할 때 전체 시스템이 블로킹될 위험이 있습니다. 이를 해결하기 위해 JavaScript 환경에서는 '이벤트 루프'와 '비동기 콜백'을 사용합니다.

- 이벤트 루프: JavaScript의 런타임에서는 콜 스택, 태스크 큐, 백그라운드 스레드 등을 관리합니다. 이벤트 루프는 콜 스택이 비어 있을 때 태스크 큐에 있는 작업을 콜 스택으로 이동시켜 실행합니다. 이 과정은 비동기 이벤트가 발생했을 때 해당 이벤트의 콜백 함수를 적절한 순간에 콜 스택에 푸시하여 실행하게 합니다.
- 백그라운드 스레드: 파일 I/O, 네트워크 요청 등의 비동기 작업은 Node.js 또는 브라우저가 제공하는 백그라운드 스레드에서 처리됩니다. 이러한 스레드들은 JavaScript 엔진과 별도로 동작하며, 작업 완료 시 그 결과를 태스크 큐에 넣습니다.

### 여러개의 쓰레드를 사용하는데 왜 싱글 쓰레드인가?

결론적으로, JavaScript 엔진 자체는 싱글 쓰레드로 작동하지만, 비동기 이벤트 처리를 위해 멀티스레딩 환경을 사용합니다. 이벤트 루프 자체는 싱글 쓰레드로 구성되어 있지만, 그 주변의 환경(백그라운드 스레드 등)은 멀티 스레드를 사용합니다. 따라서 JavaScript가 "싱글 쓰레드"라고 말할 때는 주로 콜 스택과 이벤트 루프의 작동 방식을 기준으로 하는 것이 맞습니다. 이것이 JavaScript의 비동기 작업이 가능하게 하는 기반 구조입니다.

# NestJS

- NestJS는 효율적이고 스케일링이 쉬운 NodeJS 서버를 만드는데 사용되는 프레임워크
- Express와 Fastify를 사용 가능