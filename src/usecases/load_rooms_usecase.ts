import {Credentials} from "@/domain/entities/credentials";
import {loginRepository} from "@/repositories/login_repository";
import {User} from "@/domain/entities/user";
import {loadRoomsRepository} from "@/repositories/load_rooms_repository";
import {Room} from "@/domain/entities/room";

interface LoadRoomsUseCase {
  Execute(): Promise<Room[]>
}

class LoadRoomsUseCaseImpl implements LoadRoomsUseCase {
  Execute(): Promise<Room[]> {
    try {
      return loadRoomsRepository.Execute();
    } catch (e) {
      console.log("[LoadRoomsUseCaseImpl] Error Execute ", e);
      throw e;
    }
  }
}

export const loadRoomsUseCase = new LoadRoomsUseCaseImpl() as LoadRoomsUseCase;