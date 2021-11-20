import { createHash } from 'crypto';
import { Either, left, right } from "fp-ts/Either";

export const fastModularExponentiation = (b: bigint, e: bigint, m: bigint) => {
    if(BigInt(e) == BigInt(0))
        return BigInt(1)
    var t = (BigInt(BigInt(e) & BigInt(1)) == BigInt(1)) ? BigInt(BigInt(b) % BigInt(m)) : BigInt(1)
    return BigInt((t * fastModularExponentiation(BigInt(BigInt(b) * BigInt(b) % BigInt(m)), BigInt(BigInt(e) >> BigInt(1)), BigInt(m))) % BigInt(m))
}

export const longToBytes = (event: string) => {
    if(BigInt(event) === BigInt("0"))
        return ""
    return longToBytes((BigInt(event) >> BigInt("8")).toString()) + String.fromCharCode(parseInt(BigInt(BigInt(event) % BigInt("256")).toString()))
}

export const bytesToLong = (event: string) => {
    if(event.length == 0)
        return 0
    return BigInt((BigInt(bytesToLong(event.slice(0, -1))) << BigInt(8)) + BigInt(event.slice(-1).charCodeAt(0)))
}

const extendedEuclideanAlgorithm = (a: bigint, b: bigint) => {
    if(BigInt(a) == BigInt(0))
        return [BigInt(b), BigInt(0), BigInt(1)]
    var [x, y, z] = extendedEuclideanAlgorithm(BigInt(b % a), BigInt(a))
    return [BigInt(x), BigInt(z - (b / a)*y), BigInt(y)]
}

export const inverseModulo = (a: string, n: string) => {
    var [g, res, dummy] = extendedEuclideanAlgorithm(BigInt(a), BigInt(n))
    if(g != BigInt(1))
        throw "Inverse Modulo does not exist"
    if(BigInt(res) < 0)
        return BigInt(BigInt(res) + BigInt(n))
    return BigInt(res)
}

export const calculateHash = (event) => {
    return createHash('sha256').update(event).digest('hex')
}

export const onlyDigits = (value) => {
    return /^\d+$/.test(value);
}

export const onlyHexaDecimal = (value) => {
    return /^[a-f0-9]+$/.test(value);
}