import React from 'react';
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { resetCatalog } from '../api/FakeStoreCatalog';
import { useNonPersistentStore } from '../store/NonPersistentStore';
import { MainTheme } from '../theme/Theme';

const logoIcon = require('../../img/logo.png');

export const StoreLogo = () => {
	const resettingCatalog = useNonPersistentStore((state) => state.resettingCatalog);

	const resetView = () => {
		return (
			<View style={styles.logoContainer}>
				<View style={styles.resetContainer}>
					<ActivityIndicator size={'large'} color={MainTheme.primary} />
				</View>
			</View>);
	};

	const logoView = () => {
		return (
			<TouchableOpacity onPress={resetCatalog} style={styles.logoContainer}>
				<Image source={logoIcon} style={styles.logo} />
			</TouchableOpacity>
		);
	};

	return resettingCatalog ? resetView() : logoView();
};

const styles = StyleSheet.create({
	logoContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		width: 40,
		height: 40,
		margin: 5,
	},
	resetContainer: {
		width: 40,
		height: 40,
		backgroundColor: MainTheme.white,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
