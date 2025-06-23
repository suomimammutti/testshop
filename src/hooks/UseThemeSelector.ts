import { Platform, StatusBar } from 'react-native';
import { MainStyles } from '../theme/MainStyles';

export const useThemeSelector = () => {

	const onToggleTheme = () => {
		if (Platform.OS === 'android') {
			StatusBar.setBackgroundColor(MainStyles.appContainer.backgroundColor.toString());
		}
	};

	return {
		onToggleTheme,
	};
};
