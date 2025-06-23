import { useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { IProduct } from '../utils/Types';

export const useProductCard = (product: IProduct) => {

	const [currentImage, setCurrentImage] = useState<string>(product.images[0] ?? '');
	const [selected, setSelected] = useState(false);
	const [descriptionHeight, setDescriptionHeight] = useState(0);

	const cardWidth = useSharedValue(0);
	const animatedDescriptionHeight = useSharedValue(0);

	const animatedDescriptionStyle = useAnimatedStyle(() => ({
		opacity: withTiming(selected ? 1 : 0, { duration: selected ? 1200 : 500 }),
		height: withTiming(selected ? descriptionHeight : 0, { duration: 600 }),
		overflow: 'hidden',
	}));

	const onDescriptionLayout = (event: LayoutChangeEvent) => {
		const { height } = event.nativeEvent.layout;
		if (height !== descriptionHeight && descriptionHeight === 0) {
			setDescriptionHeight(height);
		}
	};

	const animatedGalleryStyle = useAnimatedStyle(() => ({
		opacity: withTiming(selected ? 1 : 0, { duration: 750 }),
		height: selected ? withTiming(100) : withTiming(0),
	}));

	const animatedImageStyle = useAnimatedStyle(() => {
		const animatedSize = selected ? withTiming(cardWidth.value) : withTiming(100);
		return {
			width: animatedSize,
			height: animatedSize,
		};
	});

	const onCardLayout = (event: LayoutChangeEvent) => {
		if (cardWidth.value === 0) {
			const layoutWidth = Math.round(event.nativeEvent.layout.width);
			if (layoutWidth > 0 && layoutWidth !== cardWidth.value) {
				cardWidth.value = layoutWidth;
			}
		}
	};

	return {
		animatedGalleryStyle,
		animatedDescriptionStyle,
		animatedImageStyle,
		animatedDescriptionHeight,
		descriptionHeight,
		onDescriptionLayout,
		onCardLayout,
		currentImage,
		setCurrentImage,
		selected,
		setSelected,
	};
};
