import { SetMetadata } from "@nestjs/common";

// Roles 데코레이터는 특정 메소드나 클래스에 역할 기반 접근 제어를 적용하기 위해 사용
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);