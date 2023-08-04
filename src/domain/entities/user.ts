import {Credentials} from "@/domain/entities/Credentials";

export type User = {
  name: string,
  image: null | string,
  credentials: Credentials
}