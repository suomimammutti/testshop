import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

const themeIcon = require('../../img/palette.png');

export const ThemeSelector = () => {
	return (
		<TouchableOpacity onPress={() => { }} style={styles.container}>
			<Image source={themeIcon} style={styles.icon} />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {
		width: 40,
		height: 40,
		margin: 5,
	},
});
