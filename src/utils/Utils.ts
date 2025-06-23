import { formatCurrency } from 'react-native-format-currency';

export const formatPrice = (value: number) => {
	value = Math.round(value * 100) / 100;
	const [valueFormattedWithSymbol] = formatCurrency({ amount: value, code: 'EUR' });
	return valueFormattedWithSymbol;
};

export const Sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
