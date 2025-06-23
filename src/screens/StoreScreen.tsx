import React from 'react';
import {
	StyleSheet,
	View,
} from 'react-native';
import {
	useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { CartIndicator } from '../components/CartIndicator';
import { ProductFilters } from '../components/ProductFilters';
import { ProductsList } from '../components/ProductsList';
import { StoreLogo } from '../components/StoreLogo';
import { MainTheme } from '../theme/Theme';

export const StoreScreen = () => {
	const insets = useSafeAreaInsets();
	return (
		<View style={[styles.container, { paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right }]}>
			<View style={styles.topContainer}>
				<View style={styles.placeholder} />
				<StoreLogo />
				<CartIndicator />
			</View>
			<ProductFilters />
			<ProductsList />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: MainTheme.primary,
	},
	topContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	placeholder: {
		width: 40,
	},
});
