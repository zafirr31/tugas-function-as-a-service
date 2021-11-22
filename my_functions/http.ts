

const DEFAULT_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Content-Type': 'application/json',
};
  
  export class StatusCodes {
    public static readonly OK = 200;
    public static readonly CREATED = 201;
    public static readonly BAD_REQUEST = 400;
    public static readonly SERVER_ERROR = 500;
  }
  
  export class ApplicationError {
    public readonly message: string;
    public readonly errors: string[];
    public readonly statusCode: StatusCodes;
  
    public constructor(message: string, errors: string[], status: StatusCodes) {
      this.message = message;
      this.errors = errors;
      this.statusCode = status;
    }
  }
  
  export const successResponse = (statusCode: StatusCodes, result: Object) =>
    ({
      statusCode,
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(result)
    });
  
  export const errorResponse = (error: ApplicationError) =>
    ({
      statusCode: error.statusCode,
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({ message: error.message, errors: error.errors })
    });