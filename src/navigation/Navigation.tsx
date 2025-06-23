import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { CartScreen } from '../screens/CartScreen';
import { StoreScreen } from '../screens/StoreScreen';
import { ActiveTheme } from '../theme/ActiveTheme';

type TRootStackParamList = {
	Store: undefined;
	Cart: undefined;
};

declare global {
	namespace ReactNavigation {
		interface RootParamList extends TRootStackParamList { }
	}
}

const Stack = createNativeStackNavigator<TRootStackParamList>();

export const MainStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{
			headerTintColor: ActiveTheme.white.toString(),
			headerStyle: { backgroundColor: ActiveTheme.primary.toString() },
		}}>
			<Stack.Screen name="Store" component={StoreScreen} options={{ headerShown: false }} />
			<Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: true, title: 'Shopping cart' }} />
		</Stack.Navigator>
	);
};
