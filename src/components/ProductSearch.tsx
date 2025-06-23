import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useProductSearch } from '../hooks/UseProductSearch';
import { ActiveTheme } from '../theme/ActiveTheme';
import { MainStyles } from '../theme/MainStyles';

const clearIcon = require('../../img/close.png');

export const ProductSearch = () => {

	const { searchString, onSearchTextChanged, handleClear } = useProductSearch();

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.text}
				placeholderTextColor={MainStyles.fontSecondary.color}
				value={searchString}
				placeholder={'Search'}
				onChangeText={onSearchTextChanged} />

			{searchString.length > 0 &&
				<TouchableOpacity style={styles.clearContainer} onPress={handleClear}>
					<Image source={clearIcon} style={styles.clearIcon} />
				</TouchableOpacity>
			}
		</View>
	);
};


const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: ActiveTheme.white,
		paddingLeft: 20,
		borderRadius: ActiveTheme.fieldBorderRadius,
		height: ActiveTheme.fieldHeight,
		justifyContent: 'space-between',
	},
	text: {
		flexShrink: 1,
		flexGrow: 1,
		textAlign: 'left',
		textAlignVertical: 'center',
		paddingHorizontal: 10,
		fontSize: 16,
		color: ActiveTheme.primaryFontDark,
	},
	clearContainer: {
		width: 35,
		alignItems: 'center',
		justifyContent: 'center',
	},
	clearIcon: {
		width: 20,
		height: 20,
		tintColor: ActiveTheme.primaryFontDark,
	},
});
