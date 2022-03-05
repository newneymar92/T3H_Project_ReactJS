export const ACCESS_TOKEN_KEY: string = "token";

export const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export const APIHost = development ? '/api' : 'https://google.com'

export const BASE_URL = "http://api.training.div3.pgtest.co/"

export const PROCESSING_CODE = 'Processing';
export const FULFILLED_CODE = 'Fulfilled';
export const RECEIVED_CODE = 'Received';
export const PENDING_CODE = 'Pending';