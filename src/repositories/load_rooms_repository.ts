import {http} from "@/repositories/http";
import {Room} from "@/domain/entities/room";

interface LoadRoomsRepository {
  Execute(): Promise<Room[]>
}

class LoadRoomsRepositoryImpl implements LoadRoomsRepository {
  async Execute(): Promise<Room[]> {
    try {
      const response = await http.get("/rooms")
      return response.data;
    } catch (e) {
      console.log("[LoadRoomsRepositoryImpl] Error post ", e)
      throw e;
    }
  }
}

export const loadRoomsRepository = new LoadRoomsRepositoryImpl() as LoadRoomsRepository