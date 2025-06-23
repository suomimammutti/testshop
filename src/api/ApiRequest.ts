const BACKEND_URL = 'https://api.escuelajs.co/api/v1';

const defaultHeaders = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
};

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const logStatus = (response: Response) =>
	`[response (code: ${response.status}) ${response.statusText}]`;

const handleError = (context: string, errorOrResponse: unknown) => {
	if (errorOrResponse instanceof Response) {
		console.error(`Error in ${context}:`, logStatus(errorOrResponse));
	} else {
		console.error(`Error in ${context}:`, errorOrResponse);
	}
};

interface IApiRequestOptions {
	method?: HttpMethod;
	params?: Record<string, string | number>;
	body?: unknown;
	headers?: Record<string, string>;
	signal?: AbortSignal;
}

export const apiRequest = async <T>(
	endpoint: string,
	options: IApiRequestOptions = {},
	context: string = 'API request'
): Promise<T | null> => {
	const {
		method = 'GET',
		params,
		body,
		headers,
		signal,
	} = options;

	const url = new URL(`${BACKEND_URL}${endpoint}`);
	if (params) {
		Object.entries(params).forEach(([key, value]) =>
			url.searchParams.append(key, value.toString())
		);
	}

	const fetchOptions: RequestInit = {
		method,
		headers: { ...defaultHeaders, ...headers },
		signal,
	};

	if (body && method !== 'GET') {
		fetchOptions.body = JSON.stringify(body);
	}

	try {
		const response = await fetch(url.toString(), fetchOptions);
		if (response.ok) {
			return (await response.json()) as T;
		} else {
			handleError(context, response);
		}
	} catch (error) {
		if (signal?.aborted) {
			console.log(`[${context}] Request aborted`);
		} else {
			handleError(context, error);
		}
	}

	return null;
};
