import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

const storage = new MMKV({
	id: 'zustand_storage_testing',
});

export const ClearMMKV = () => { storage.clearAll(); };

export const zustandStorage: StateStorage = {
	setItem: (name, value) => {
		return storage.set(name, value);
	},
	getItem: (name) => {
		const value = storage.getString(name);
		return value ?? null;
	},
	removeItem: (name) => {
		return storage.delete(name);
	},
};
