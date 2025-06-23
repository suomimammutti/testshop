import React from 'react';
import {
	StyleSheet,
	View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CartIndicator } from '../components/CartIndicator';
import { ProductFilters } from '../components/ProductFilters';
import { ProductsList } from '../components/ProductsList';
import { StoreLogo } from '../components/StoreLogo';
import { ThemeSelector } from '../components/ThemeSelector';
import { ActiveTheme } from '../theme/ActiveTheme';

export const StoreScreen = () => {
	const insets = useSafeAreaInsets();
	return (
		<View style={[styles.container, { paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right }]}>
			<View style={styles.topContainer}>
				<ThemeSelector />
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
		backgroundColor: ActiveTheme.primary,
	},
	topContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	placeholder: {
		width: 40,
		height: 40,
		backgroundColor: '#0f0',
	},
});
