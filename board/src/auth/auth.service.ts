import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/authCredential.dto';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }

  async signIn(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.userRepository.signUser(authCredentialDto);
  }
}
