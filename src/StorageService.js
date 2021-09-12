const localStorageName = "paris_event_asj";

const StorageService = {
  // Get the last 15 events
  getLocalStorage() {
    const storedList = localStorage.getItem(localStorageName);
    const storageArray = storedList ? JSON.parse(storedList) : [];
    return storageArray;
  }
};

export default StorageService;
