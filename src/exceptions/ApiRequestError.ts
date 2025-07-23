import {HttpStatusMessages} from '@app-types/api.types.ts';
import {LOG_API_ERRORS} from '@src/constants.ts';
import {logAPI} from '@src/utils/logger.ts';

const DEFAULT_ERROR_MESSAGE = 'Unknown error happened.';
export interface ApiRequestErrorType {
    code: number;
    message: string;
    errors?: {[key: string] : string} | null;
}
class ApiRequestError extends Error implements ApiRequestErrorType {
    code: number;
    message: string;
    errors: {[key: string] : string} | null;

    constructor(code: number, message: string, errors?: {[key: string] : string} | null) {
        super(message);
        this.code = code;
        this.message = message || HttpStatusMessages[code] || DEFAULT_ERROR_MESSAGE;
        this.errors = errors ?? null;

        if(LOG_API_ERRORS){
            logAPI.error(this.code, this.message, this.errors);
        }

        Object.setPrototypeOf(this, ApiRequestError.prototype);
    }

    toString() {
        return this.code + ': ' + this.message;
    }
}

export default ApiRequestError;
