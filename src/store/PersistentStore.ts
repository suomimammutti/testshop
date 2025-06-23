import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from './ZustandStorage';

// This file is just in case something needs to be stored between sessions.

export interface IPersistentStoreState {
	value1: number;
	value2: number;
	value3: number;
}

export interface IPersistentStoreActions {
	resetStore: () => void;
	action1: () => void;
	action2: () => void;
	asyncAction1: () => Promise<void>;
}

const initialState: IPersistentStoreState = {
	value1: 123,
	value2: 456,
	value3: 789,
};

export const usePersistentStore = create<IPersistentStoreState & IPersistentStoreActions>()(
	persist(
		(set, get) => ({
			...initialState,

			resetStore: () => set(initialState),

			action1: () => set((state) => {
				return {
					value1: state.value1 + 1,
				};
			}),

			action2: () => set((state) => {
				return {
					value2: state.value2 + 1,
				};
			}),

			asyncAction1: async () => {
				await new Promise(f => setTimeout(f, 3000));
				set({
					value3: get().value3 + 1,
				});
			},
		}),
		{
			name: 'my-persistent-store',
			storage: createJSONStorage(() => zustandStorage),
		})
);

if (__DEV__) {
	usePersistentStore.subscribe(console.log);
}
