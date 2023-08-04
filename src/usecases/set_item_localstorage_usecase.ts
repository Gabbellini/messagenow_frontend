interface SetItemLocalStorage {
  Execute(key: string, value: string): void
}

class SetItemLocalStorageImpl implements SetItemLocalStorage {
  Execute(key: string, value: string): void {
    return localStorage.setItem(key, value);
  }
}

export const setItemLocalStorageUseCase = new SetItemLocalStorageImpl() as SetItemLocalStorage;