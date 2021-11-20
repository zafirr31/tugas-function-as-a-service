var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// my_functions/helpers.ts
__export(exports, {
  bytesToLong: () => bytesToLong,
  calculateHash: () => calculateHash,
  fastModularExponentiation: () => fastModularExponentiation,
  inverseModulo: () => inverseModulo,
  longToBytes: () => longToBytes,
  onlyDigits: () => onlyDigits,
  onlyHexaDecimal: () => onlyHexaDecimal
});
var import_crypto = __toModule(require("crypto"));
var fastModularExponentiation = (b, e, m) => {
  if (BigInt(e) == BigInt(0))
    return BigInt(1);
  var t = BigInt(BigInt(e) & BigInt(1)) == BigInt(1) ? BigInt(BigInt(b) % BigInt(m)) : BigInt(1);
  return BigInt(t * fastModularExponentiation(BigInt(BigInt(b) * BigInt(b) % BigInt(m)), BigInt(BigInt(e) >> BigInt(1)), BigInt(m)) % BigInt(m));
};
var longToBytes = (event) => {
  if (BigInt(event) === BigInt("0"))
    return "";
  return longToBytes((BigInt(event) >> BigInt("8")).toString()) + String.fromCharCode(parseInt(BigInt(BigInt(event) % BigInt("256")).toString()));
};
var bytesToLong = (event) => {
  if (event.length == 0)
    return 0;
  return BigInt((BigInt(bytesToLong(event.slice(0, -1))) << BigInt(8)) + BigInt(event.slice(-1).charCodeAt(0)));
};
var extendedEuclideanAlgorithm = (a, b) => {
  if (BigInt(a) == BigInt(0))
    return [BigInt(b), BigInt(0), BigInt(1)];
  var [x, y, z] = extendedEuclideanAlgorithm(BigInt(b % a), BigInt(a));
  return [BigInt(x), BigInt(z - b / a * y), BigInt(y)];
};
var inverseModulo = (a, n) => {
  var [g, res, dummy] = extendedEuclideanAlgorithm(BigInt(a), BigInt(n));
  if (g != BigInt(1))
    throw "Inverse Modulo does not exist";
  if (BigInt(res) < 0)
    return BigInt(BigInt(res) + BigInt(n));
  return BigInt(res);
};
var calculateHash = (event) => {
  return (0, import_crypto.createHash)("sha256").update(event).digest("hex");
};
var onlyDigits = (value) => {
  return /^\d+$/.test(value);
};
var onlyHexaDecimal = (value) => {
  return /^[a-f0-9]+$/.test(value);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  bytesToLong,
  calculateHash,
  fastModularExponentiation,
  inverseModulo,
  longToBytes,
  onlyDigits,
  onlyHexaDecimal
});
//# sourceMappingURL=helpers.js.map
