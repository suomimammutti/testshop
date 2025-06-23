/*
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');



// ORIGINAL BEFORE REANIMATED
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
*/


/* previous reanimated config
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const {
	resolver: { sourceExts, assetExts },
} = getDefaultConfig(__dirname);

const config = {
	transformer: {
		getTransformOptions: async () => ({
			transform: {
				experimentalImportSupport: false,
				inlineRequires: true,
			},
		}),
		babelTransformerPath: require.resolve('react-native-svg-transformer'),
	},
	resolver: {
		assetExts: assetExts.filter(ext => ext !== 'svg'),
		sourceExts: [...sourceExts, 'svg'],
	},
};

module.exports = mergeConfig(defaultConfig, config);
*/


// metro.config.js - latest config with reanimated
const {
	wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const {
	resolver: { sourceExts, assetExts },
} = getDefaultConfig(__dirname);

const config = {
	transformer: {
		getTransformOptions: async () => ({
			transform: {
				experimentalImportSupport: false,
				inlineRequires: true,
			},
		}),
		babelTransformerPath: require.resolve('react-native-svg-transformer'),
	},
	resolver: {
		assetExts: assetExts.filter(ext => ext !== 'svg'),
		sourceExts: [...sourceExts, 'svg'],
	},
};

const mergedConfig = mergeConfig(defaultConfig, config);

module.exports = wrapWithReanimatedMetroConfig(mergedConfig);