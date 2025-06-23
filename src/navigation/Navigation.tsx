import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { CartScreen } from '../screens/CartScreen';
import { StoreScreen } from '../screens/StoreScreen';
import { MainTheme } from '../theme/Theme';

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
			headerTintColor: MainTheme.white.toString(),
			headerStyle: { backgroundColor: MainTheme.primary.toString() },
		}}>
			<Stack.Screen name="Store" component={StoreScreen} options={{ headerShown: false }} />
			<Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: true, title: 'Shopping cart' }} />
		</Stack.Navigator>
	);
};
