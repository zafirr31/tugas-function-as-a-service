var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// my_functions/http.ts
__export(exports, {
  ApplicationError: () => ApplicationError,
  StatusCodes: () => StatusCodes,
  errorResponse: () => errorResponse,
  successResponse: () => successResponse
});
var DEFAULT_HEADERS = {
  "Content-Type": "application/json"
};
var StatusCodes = class {
};
__publicField(StatusCodes, "OK", 200);
__publicField(StatusCodes, "CREATED", 201);
__publicField(StatusCodes, "BAD_REQUEST", 400);
__publicField(StatusCodes, "SERVER_ERROR", 500);
var ApplicationError = class {
  constructor(message, errors, status) {
    __publicField(this, "message");
    __publicField(this, "errors");
    __publicField(this, "statusCode");
    this.message = message;
    this.errors = errors;
    this.statusCode = status;
  }
};
var successResponse = (statusCode, result) => ({
  statusCode,
  headers: DEFAULT_HEADERS,
  body: JSON.stringify(result)
});
var errorResponse = (error) => ({
  statusCode: error.statusCode,
  headers: DEFAULT_HEADERS,
  body: JSON.stringify({ message: error.message, errors: error.errors })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ApplicationError,
  StatusCodes,
  errorResponse,
  successResponse
});
//# sourceMappingURL=http.js.map
