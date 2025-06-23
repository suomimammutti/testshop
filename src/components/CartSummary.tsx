import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNonPersistentStore } from '../store/NonPersistentStore';
import { ActiveTheme } from '../theme/ActiveTheme';
import { MainStyles } from '../theme/MainStyles';
import { formatPrice } from '../utils/Utils';

export const CartSummary = () => {
	const cartPrice = useNonPersistentStore((state) => state.cartPrice);
	const cartCount = useNonPersistentStore((state) => state.cartCount);
	const insets = useSafeAreaInsets();

	return cartCount ? (
		<Animated.View style={styles.summaryContainer} entering={FadeIn} exiting={FadeOut}>
			<View style={styles.infoContainer}>
				<Text style={MainStyles.fontPrimary}>{'Total'}</Text>
				<Text style={[MainStyles.fontSecondary, styles.infoPrice]}>{formatPrice(cartPrice)}</Text>
			</View>
			<View style={{ height: insets.bottom }} />
		</Animated.View>
	) : null;
};

const styles = StyleSheet.create({
	summaryContainer: {
		borderTopColor: ActiveTheme.primaryDark,
		borderTopWidth: ActiveTheme.cardBorderWidth,
		backgroundColor: ActiveTheme.white,
	},
	infoContainer: {
		minHeight: 50,
		paddingHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	infoPrice: {
		fontWeight: 'bold',
	},
});
