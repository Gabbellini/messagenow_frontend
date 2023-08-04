import {Credentials} from "@/domain/entities/credentials";
import {http} from "@/repositories/http";
import {User} from "@/domain/entities/user";

interface LoginRepository {
  Execute(credentials: Credentials): Promise<User>
}

class LoginRepositoryImpl implements LoginRepository {
  async Execute(credentials: Credentials): Promise<User> {
    try {
      const { data } = await http.post("/api/login", credentials, {
        withCredentials: false,
      })
      return data;
    } catch (e) {
      console.log("[LoginRepositoryImpl] Error post ", e)
      throw e;
    }
  }
}

export const loginRepository = new LoginRepositoryImpl() as LoginRepository