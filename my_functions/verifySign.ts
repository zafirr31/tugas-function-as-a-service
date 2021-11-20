import { chain, fold } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { APIGatewayEvent, Context } from 'aws-lambda'
import { ApplicationError, StatusCodes, errorResponse, successResponse } from "./http"
import { Either, left, right } from "fp-ts/Either";
import { fastModularExponentiation, longToBytes, onlyDigits, calculateHash, onlyHexaDecimal } from "./helpers"

type VerifySignatureParameters = {
    m: string
    e: string
    n: string
    signature: string
};

const convertAPIEventToVerifySignatureParameters = (event: APIGatewayEvent) => {
    return right<ApplicationError, VerifySignatureParameters>({
        e: event.queryStringParameters.e,
        m: event.queryStringParameters.m,
        n: event.queryStringParameters.n,
        signature: event.queryStringParameters.signature,
    });
}

const paramsNotNull = (event: APIGatewayEvent) => {
    if(event.queryStringParameters.m == null || event.queryStringParameters.e == null || event.queryStringParameters.n == null || event.queryStringParameters.signature == null)    {
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
    if(!onlyDigits(event.queryStringParameters.e) || !onlyDigits(event.queryStringParameters.n))    {
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

const signatureIsHexidecimal = (event: APIGatewayEvent) => {
    if(!onlyHexaDecimal(event.queryStringParameters.signature))    {
        return left<ApplicationError, APIGatewayEvent>(
            new ApplicationError(
                'Error parsing query parameters',
                ['Signature should contain only Hexadecimal characters'],
                StatusCodes.BAD_REQUEST
            )
        );
    }
    return right<ApplicationError, APIGatewayEvent>(event);
}

const validateVerifySignatureParameters = (event: APIGatewayEvent): Either<ApplicationError, APIGatewayEvent> => {
    return pipe(
        paramsNotNull(event),
        chain(paramsArePositiveIntegers),
        chain(signatureIsHexidecimal)
    )
}

const rightCalculateHash = (event: VerifySignatureParameters) => {
    return right({
        ...event,
        hash: calculateHash(event.m)
    })
}

const calculateSignatureHash = (event) => {
    return right({
        ...event,
        calculatedHash: longToBytes(fastModularExponentiation(BigInt(event.signature), BigInt(event.e), BigInt(event.n)).toString())
    })
}

const verifySignMatches = (event) => {
    if(event.hash === event.calculatedHash) {
        return right("Signature is Verified")
    }
    return left(
        new ApplicationError(
            'Error verifying signature',
            ['Signature does not match'],
            StatusCodes.BAD_REQUEST
        )
    );
}

const verifySign = (event: VerifySignatureParameters) => {
    return pipe(
        calculateSignatureHash(event),
        chain(rightCalculateHash),
        chain(verifySignMatches)
    )
}

async function handler(event: APIGatewayEvent, context: Context) {
    return pipe(
            validateVerifySignatureParameters(event),
            chain(convertAPIEventToVerifySignatureParameters),
            chain(verifySign),
            fold(
                error => errorResponse(error),
                result => successResponse(StatusCodes.OK, result)
            )
        )
}

export { handler };