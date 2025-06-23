import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { useCartIndicator } from '../hooks/UserCartIndicator';
import { MainTheme } from '../theme/Theme';

const cartIcon = require('../../img/cart.png');

export const CartIndicator = () => {

	const { animatedStyle, cartCount, handlePress } = useCartIndicator();

	return (
		<TouchableOpacity onPress={handlePress} style={styles.container}>
			<Image source={cartIcon} style={styles.icon} />
			{cartCount > 0 &&
				<Animated.View style={[animatedStyle, styles.indicatorContainer]}>
					<Text style={styles.indicatorText}>{cartCount}</Text>
				</Animated.View>
			}
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
	indicatorContainer: {
		position: 'absolute',
		top: 6,
		right: 6,
		backgroundColor: MainTheme.attentionColor,
		borderRadius: 10,
		width: 20,
		height: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	indicatorText: {
		color: MainTheme.white,
		fontSize: 12,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
