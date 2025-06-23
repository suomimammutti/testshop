import { Image, StyleSheet, View } from 'react-native';
import { useNonPersistentStore } from '../store/NonPersistentStore';
import { ActiveTheme } from '../theme/ActiveTheme';

const logoIcon = require('../../img/logo.png');

export const SplashScreen = () => {
	const appLoaded = useNonPersistentStore((state) => state.appLoaded);
	return !appLoaded ? (
		<View style={styles.container}>
			<Image source={logoIcon} style={styles.logo} />
		</View>
	) : null;
};

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: ActiveTheme.primary,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logo: {
		width: 100,
		height: 100,
	},
});

