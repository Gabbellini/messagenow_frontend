import {ActionContext} from "vuex";
import {Credentials} from "@/domain/entities/credentials";
import {loginUseCase} from "@/usecases/login_usecase";
import {User} from "@/domain/entities/user";
import {getItemLocalStorageUseCase} from "@/usecases/get_item_localstorage_usecase";
import {setItemLocalStorageUseCase} from "@/usecases/set_item_localstorage_usecase";

class AuthorizationState {
  user: User | null = null;
}

const userKeyLocalStorage = "user";

const state = new AuthorizationState();

const mutations = {
  SET_USER(state: AuthorizationState, user: User): void {
    state.user = user;
  }
};

const actions = {
  login: async ({commit}: ActionContext<AuthorizationState, AuthorizationState>, credentials: Credentials) => {
    try {
      const user: User = await login(credentials);
      persistUserOnLocalStorage(user);
      commit("SET_USER", user);
    } catch (e) {
      console.log("[actions] Error login ", e);
      throw e;
    }
  },
};

const login = async (credentials: Credentials): Promise<User> => {
  try {
    return await loginUseCase.Execute(credentials);
  } catch (e) {
    console.log("[login] Error loginUseCase.Execute ", e);
    throw e;
  }
}

const persistUserOnLocalStorage = (user: User): void => {
  setItemLocalStorageUseCase.Execute(userKeyLocalStorage, JSON.stringify(user));
}

const getters = {
  user: (state: AuthorizationState): User | null => getUser(state),
};

const getUser = (state: AuthorizationState): User | null => {
  if (state.user) {
    return state.user;
  }

  const userStorage = getItemLocalStorageUseCase.Execute(userKeyLocalStorage);
  if (userStorage) {
    return JSON.parse(userStorage);
  }

  return null;
}

export default {
  namespaced: true,
  state: state,
  mutations,
  actions,
  getters
}