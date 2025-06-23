import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainStackNavigator } from '../navigation/Navigation';
import { SplashScreen } from '../screens/SplashScreen';
import { MainStyles } from '../theme/MainStyles';

const App = () => {
	return (
		<SafeAreaProvider style={MainStyles.appContainer}>
			<StatusBar backgroundColor={MainStyles.appContainer.backgroundColor} translucent={false} barStyle={'light-content'} />
			<NavigationContainer>
				<MainStackNavigator />
			</NavigationContainer>
			<SplashScreen />
		</SafeAreaProvider>
	);
};

export default App;

