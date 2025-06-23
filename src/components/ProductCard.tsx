import { FasterImageView } from '@candlefinance/faster-image';
import { useMappingHelper } from '@shopify/flash-list';
import {
	Image,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	TouchableOpacity,
	View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { useProductCard } from '../hooks/UseProductCard';
import { ActiveTheme } from '../theme/ActiveTheme';
import { MainStyles } from '../theme/MainStyles';
import { IProduct } from '../utils/Types';
import { formatPrice } from '../utils/Utils';
import { AddToCartButton } from './AddToCartButton';

const galleryIcon = require('../../img/gallery.png');

const AnimatedFasterImage = Animated.createAnimatedComponent(FasterImageView);

interface IProductElementProps {
	product: IProduct;
	onSelect: () => void;
}

export const ProductCard = ({ product, onSelect }: IProductElementProps) => {
	const { getMappingKey } = useMappingHelper();
	const {
		animatedGalleryStyle,
		animatedDescriptionStyle,
		animatedImageStyle,
		onCardLayout,
		selected,
		setSelected,
		descriptionHeight,
		currentImage,
		setCurrentImage,
		onDescriptionLayout,
	} = useProductCard(product);

	const onPressed = () => {
		if (!selected) { onSelect(); }
		setSelected(prev => !prev);
	};

	return (
		<TouchableNativeFeedback onPress={onPressed} >
			<View style={MainStyles.cardStyle} >

				<View style={styles.topContainer} onLayout={onCardLayout}>
					<AnimatedFasterImage source={{ url: currentImage, cachePolicy: 'memory', borderRadius: MainStyles.cardStyle.borderRadius }} style={animatedImageStyle} />
					{!selected && product.images.length > 1 &&
						<View style={styles.moreImagesContainer}>
							<Image source={galleryIcon} style={styles.moreImagesIcon} />
							<Text style={styles.moreImagesCount}>{product.images.length - 1}</Text>
						</View>
					}
				</View>

				{product.images.length > 1 &&
					<Animated.ScrollView horizontal={true} style={[animatedGalleryStyle, styles.galleryContainer]}>
						{product.images.map((image: string, index: number) => {

							return (
								<TouchableOpacity key={getMappingKey(image, index)} onPress={() => setCurrentImage(image)}>
									<FasterImageView source={{ url: image, cachePolicy: 'memory' }} style={styles.galleryImage} />
								</TouchableOpacity>
							);
						})}
					</Animated.ScrollView>
				}

				<View style={styles.bottomContainer}>
					<View style={styles.infoContainer}>
						<Text style={MainStyles.fontPrimary}>{product.title}</Text>
						<Text style={MainStyles.fontSecondary}>{formatPrice(product.price)}</Text>
					</View>
					<AddToCartButton product={product} />
				</View>

				{/* Hidden description for measuring height */}
				{selected && descriptionHeight === 0 && (
					<View>
						<View onLayout={onDescriptionLayout} style={styles.absoluteFiller}>
							<Text style={[MainStyles.fontSecondary, styles.descriptionCalculation]}>
								{product.description}
							</Text>
						</View>
					</View>
				)}

				{/* Animated description */}
				{descriptionHeight > 0 && (
					<Animated.View style={[animatedDescriptionStyle]}>
						<Text style={[MainStyles.fontSecondary, styles.description]}>
							{product.description}
						</Text>
					</Animated.View>
				)}

			</View>
		</TouchableNativeFeedback >
	);
};

const styles = StyleSheet.create({
	container: {
		...MainStyles.cardStyle,
	},
	cardMeasure: {
		flex: 1,
		height: 0,
	},
	topContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	imageContainer: {
		width: 100,
		height: 100,
		backgroundColor: ActiveTheme.white,
	},
	moreImagesContainer: {
		flexDirection: 'row',
	},
	moreImagesIcon: {
		tintColor: '#ccc',
		width: 25,
		height: 25,
		marginHorizontal: 5,
	},
	moreImagesCount: {
		color: '#ccc',
		fontSize: 16,
	},
	galleryContainer: {
		flexDirection: 'row',
		marginVertical: 2,
	},
	galleryImage: {
		width: 100,
		height: 100,
		marginRight: 2,
		backgroundColor: '#444',
	},
	bottomContainer: {
		flexDirection: 'row',
		alignContent: 'space-between',
		marginVertical: 5,
	},
	infoContainer: {
		flex: 1,
		marginRight: 10,
	},
	absoluteFiller: {
		position: 'absolute', opacity: 0, left: 0, right: 0,
	},
	descriptionCalculation: {
		marginBottom: 10,
	},
	description: {
		position: 'absolute',
		marginBottom: 10,
	},
});
