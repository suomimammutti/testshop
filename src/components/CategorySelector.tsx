import { Image, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useCategories } from '../hooks/UseCategories';
import { useNonPersistentStore } from '../store/NonPersistentStore';
import { ActiveTheme } from '../theme/ActiveTheme';
import { ICategory } from '../utils/Types';

const defaultCategoryIcon = require('../../img/category.png');

export const CategorySelector = () => {

	const categories = useCategories();
	const selectedCategoryId = useNonPersistentStore((state) => state.selectedCategoryId);
	const setSelectedCategoryId = useNonPersistentStore((state) => state.setSelectedCategoryId);

	const renderCategory = (item: ICategory, _selected?: boolean) => {
		return (
			<View style={styles.categoryContainer}>
				<Image source={item.image ? { uri: item.image } : defaultCategoryIcon} style={styles.categoryIcon} />
				<Text style={styles.categoryText}>{item.name}</Text>
			</View>
		);
	};

	return (
		<Dropdown
			style={styles.container}
			selectedTextStyle={styles.categoryText}
			renderItem={renderCategory}
			data={categories}
			maxHeight={400}
			labelField="name"
			valueField="id"
			value={selectedCategoryId}
			onChange={item => {
				if (item?.id != null) {
					setSelectedCategoryId(item.id);
				}
			}}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: ActiveTheme.fieldHeight,
		backgroundColor: ActiveTheme.white,
		borderRadius: ActiveTheme.fieldBorderRadius,
		paddingLeft: 20,
		paddingRight: 10,
	},
	categoryText: {
		color: ActiveTheme.primaryFontDark,
		fontSize: 17,
	},
	categoryContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 10,
	},
	categoryIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginLeft: 10,
		marginRight: 10,
	},
});
