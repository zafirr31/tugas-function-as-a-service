import { chain, fold } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { APIGatewayEvent, Context } from 'aws-lambda'
import { ApplicationError, StatusCodes, errorResponse, successResponse } from "./http"
import { Either, left, right } from "fp-ts/Either";
import { fastModularExponentiation, longToBytes, onlyDigits, calculateHash, bytesToLong } from "./helpers"

type SignatureParameters = {
    m: string
    d: string
    n: string
};

const convertAPIEventToSignatureParameters = (event: APIGatewayEvent) => {
    return right<ApplicationError, SignatureParameters>({
        d: event.queryStringParameters.d,
        m: event.queryStringParameters.m,
        n: event.queryStringParameters.n,
    });
}

const paramsNotNull = (event: APIGatewayEvent) => {
    if(event.queryStringParameters.m == null || event.queryStringParameters.d == null || event.queryStringParameters.n == null)    {
        return left<ApplicationError, APIGatewayEvent>(
            new ApplicationError(
                'Error parsing query parameters',
                ['Query params should not be empty'],
                StatusCodes.BAD_REQUEST
            )
        );
    }
    return right<ApplicationError, APIGatewayEvent>(event);
} 

const paramsArePositiveIntegers = (event: APIGatewayEvent) => {
    if(!onlyDigits(event.queryStringParameters.d) || !onlyDigits(event.queryStringParameters.n))    {
        return left<ApplicationError, APIGatewayEvent>(
            new ApplicationError(
                'Error parsing query parameters',
                ['Query params should be positive integers'],
                StatusCodes.BAD_REQUEST
            )
        );
    }
    return right<ApplicationError, APIGatewayEvent>(event);
}

const validateSignatureParameters = (event: APIGatewayEvent): Either<ApplicationError, APIGatewayEvent> => {
    return pipe(
        paramsNotNull(event),
        chain(paramsArePositiveIntegers)
    )
}

const rightCalculateHash = (event: SignatureParameters) => {
    return right({
        ...event,
        hash: bytesToLong(calculateHash(event.m))
    })
}

const calculateSignature = (event) => {
    return right(bytesToLong(fastModularExponentiation(BigInt(event.hash), BigInt(event.d), BigInt(event.n)).toString()))
}

const rightLongToBytes = (event: string) => {
    return right(longToBytes(event));
}

const sign = (event: SignatureParameters) => {
    return pipe(
        rightCalculateHash(event),
        chain(calculateSignature),
        chain(rightLongToBytes)
    )
}

async function handler(event: APIGatewayEvent, context: Context) {
    return pipe(
            validateSignatureParameters(event),
            chain(convertAPIEventToSignatureParameters),
            chain(sign),
            fold(
                error => errorResponse(error),
                result => successResponse(StatusCodes.OK, result)
            )
        )
}

export { handler };