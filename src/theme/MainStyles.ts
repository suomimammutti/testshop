import { StyleSheet } from 'react-native';
import { ActiveTheme } from './ActiveTheme';

export const MainStyles = StyleSheet.create({
	appContainer: {
		flex: 1,
		backgroundColor: ActiveTheme.primary,
	},
	cardStyle: {
		backgroundColor: ActiveTheme.cardColor,
		borderColor: ActiveTheme.primaryDark,
		borderRadius: ActiveTheme.cardBorderRadius,
		borderWidth: 0,
		borderBottomWidth: ActiveTheme.cardBorderWidth,
		borderLeftWidth: ActiveTheme.cardBorderWidth,
		padding: 5,
		marginVertical: 2,
		marginHorizontal: 5,
	},
	actionButton: {
		backgroundColor: ActiveTheme.primary,
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		height: 35,
		width: 35,
		borderRadius: 20,
	},
	actionIcon: {
		tintColor: ActiveTheme.white,
		width: 30,
		height: 30,
	},
	fontPrimary: {
		color: ActiveTheme.primaryFontDark,
		fontWeight: 'bold',
		fontSize: ActiveTheme.defaultFontSize,
	},
	fontSecondary: {
		color: ActiveTheme.secondaryFont,
		fontWeight: 'normal',
		fontSize: ActiveTheme.defaultFontSize,
	},
	productInCart: {
		backgroundColor: ActiveTheme.attentionColor,
	},
	productNotInCart: {
		backgroundColor: ActiveTheme.primary,
	},
});
