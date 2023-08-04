import {Credentials} from "@/domain/entities/Credentials";
import {loginRepository} from "@/repositories/login_repository";
import {User} from "@/domain/entities/user";

interface LoginUseCase {
  Execute(credentials: Credentials): Promise<User>
}

class LoginUseCaseImpl implements LoginUseCase {
  Execute(credentials: Credentials): Promise<User> {
    try {
      return loginRepository.Execute(credentials);
    } catch (e) {
      console.log("[LoginUseCaseImpl] Error Execute ", e);
      throw e;
    }
  }
}

export const loginUseCase = new LoginUseCaseImpl() as LoginUseCase;