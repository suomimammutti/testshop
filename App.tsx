import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainStackNavigator } from './src/navigation/Navigation';
import { SplashScreen } from './src/screens/SplashScreen';
import { MainTheme } from './src/theme/Theme';

const App = () => {
	return (
		<SafeAreaProvider style={styles.container}>
			<StatusBar backgroundColor={MainTheme.primary} translucent={false} barStyle={'dark-content'} />
			<NavigationContainer>
				<MainStackNavigator />
			</NavigationContainer>
			<SplashScreen />
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: MainTheme.primary,
	},
});

export default App;

