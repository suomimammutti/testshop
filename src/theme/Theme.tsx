import { ColorValue, StyleSheet } from 'react-native';

export interface ITheme {
	primary: ColorValue;
	primaryDark: ColorValue;
	attentionColor: ColorValue;

	defaultFontSize: number;

	primaryFontLight: ColorValue;
	primaryFontDark: ColorValue;
	secondaryFont: ColorValue;

	backgroundColor: ColorValue;
	cardColor: ColorValue;
	white: ColorValue;
	black: ColorValue;

	cardBorderRadius: number;
	cardBorderWidth: number;

	fieldHeight: number;
	fieldBorderRadius: number;
}

export const MainTheme: ITheme = {
	primary: '#05b8c4',
	primaryDark: '#008c96',
	attentionColor: '#fd3ba6',

	defaultFontSize: 16,
	primaryFontLight: '#00dfee',
	primaryFontDark: '#00464b',
	secondaryFont: '#000',

	backgroundColor: '#f5f5f5',
	cardColor: '#fff',
	white: '#fff',
	black: '#000',

	cardBorderRadius: 10,
	cardBorderWidth: 2,

	fieldHeight: 40,
	fieldBorderRadius: 20,
};

export const MainStyles = StyleSheet.create({
	cardStyle: {
		backgroundColor: MainTheme.cardColor,
		borderColor: MainTheme.primaryDark,
		borderRadius: MainTheme.cardBorderRadius,
		borderWidth: 0,
		borderBottomWidth: MainTheme.cardBorderWidth,
		borderLeftWidth: MainTheme.cardBorderWidth,
		padding: 5,
		marginVertical: 2,
		marginHorizontal: 5,
	},
	actionButton: {
		backgroundColor: MainTheme.primary,
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		height: 35,
		width: 35,
		borderRadius: 20,
	},
	actionIcon: {
		tintColor: MainTheme.white,
		width: 30,
		height: 30,
	},
	fontPrimary: {
		color: MainTheme.primaryFontDark,
		fontWeight: 'bold',
		fontSize: MainTheme.defaultFontSize,
	},
	fontSecondary: {
		color: MainTheme.secondaryFont,
		fontWeight: 'normal',
		fontSize: MainTheme.defaultFontSize,
	},
});
