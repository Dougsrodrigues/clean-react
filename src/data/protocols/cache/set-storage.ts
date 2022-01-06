interface SetStorage {
  set(key: string, value: any): Promise<void>;
}

export { SetStorage };
