interface GetItemLocalStorageRepository {
  Execute(key: string): null | string
}

class GetItemLocalStorageRepositoryImpl implements GetItemLocalStorageRepository {
  Execute(key: string): null | string {
    return localStorage.getItem(key);
  }
}

export const getItemLocalStorageRepository = new GetItemLocalStorageRepositoryImpl() as GetItemLocalStorageRepository;