import {getItemLocalStorageRepository} from "@/repositories/get_item_localstorage_repository";

interface GetItemLocalStorageUseCase {
  Execute(key: string): null | string
}

class GetItemLocalStorageUseCaseImpl implements GetItemLocalStorageUseCase {
  Execute(key: string): null | string {
    return getItemLocalStorageRepository.Execute(key);
  }
}

export const getItemLocalStorageUseCase = new GetItemLocalStorageUseCaseImpl() as GetItemLocalStorageUseCase;