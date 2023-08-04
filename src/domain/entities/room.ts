import {User} from "@/domain/entities/user";

export type Room = {
  id: number,
  createdAt: string,
  modifiedAt: string,
  users: User[],
}