import * as SecureStore from "expo-secure-store";

export const clearStoredData = async () => {
  const stored = await load("storage_keys");
  if(stored){
    for(const k in stored){
      await SecureStore.deleteItemAsync(k);
    }
    await SecureStore.deleteItemAsync("storage_keys");
  }
}

const updateStoredValues = async(key, operation) => {
  const stored = await load("storage_keys");
  if(!stored && operation === "add"){
    await save("storage_keys",[key]);
  }
  else if (stored && !stored.includes(key) && operation === "add"){
    const newKeys = [...stored, key];
    await save("storage_keys", newKeys);
  }
  else if (stored && stored.includes(key) && operation === "delete"){
    const newKeys = stored.map(s => s !== "key");
    await save("storage_keys", newKeys);
  }
}

export const save = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
  await updateStoredValues(key, "add");
};

export const remove = async (key) => {
  await SecureStore.deleteItemAsync(key);
  await updateStoredValues(key, "delete");
}

export const load = async (key) => {
  const result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return null;
  }
};
