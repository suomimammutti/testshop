import React from 'react';
import {
	StyleSheet,
	View,
} from 'react-native';
import { CartList } from '../components/CartList';
import { CartSummary } from '../components/CartSummary';
import { ActiveTheme } from '../theme/ActiveTheme';

export const CartScreen = () => {
	return (
		<View style={styles.container}>
			<CartList />
			<CartSummary />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: ActiveTheme.primary,
	},
});
