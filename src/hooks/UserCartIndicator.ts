import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useNonPersistentStore } from '../store/NonPersistentStore';

export const useCartIndicator = () => {
	const navigation = useNavigation();
	const cartCount = useNonPersistentStore((state) => state.cartCount);

	const scale = useSharedValue(1);

	useEffect(() => {
		if (cartCount > 0) {
			scale.value = withSpring(1.3, { damping: 5, stiffness: 150 }, () => {
				scale.value = withSpring(1);
			});
		}
	}, [cartCount, scale]);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
	}));

	const handlePress = () => { navigation.navigate('Cart'); };

	return {
		animatedStyle,
		cartCount,
		handlePress,
	};
};
