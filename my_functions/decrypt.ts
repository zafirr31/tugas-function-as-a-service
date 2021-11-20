import { chain, fold } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { APIGatewayEvent, Context } from 'aws-lambda'
import { ApplicationError, StatusCodes, errorResponse, successResponse } from "./http"
import { Either, left, right } from "fp-ts/Either";
import { fastModularExponentiation, longToBytes, onlyDigits } from "./helpers"

type DecryptionParameters = {
    c: string
    d: string
    n: string
};

const convertAPIEventToDecryptionParameters = (event: APIGatewayEvent) => {
    return right<ApplicationError, DecryptionParameters>({
        d: event.queryStringParameters.d,
        c: event.queryStringParameters.c,
        n: event.queryStringParameters.n,
    });
}

const paramsNotNull = (event: APIGatewayEvent) => {
    if(event.queryStringParameters.c == null || event.queryStringParameters.d == null || event.queryStringParameters.n == null)    {
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
    if(!onlyDigits(event.queryStringParameters.d) || !onlyDigits(event.queryStringParameters.c) || !onlyDigits(event.queryStringParameters.n))    {
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

const validateDecryptionParameters = (event: APIGatewayEvent): Either<ApplicationError, APIGatewayEvent> => {
    return pipe(
        paramsNotNull(event),
        chain(paramsArePositiveIntegers)
    )
}

const calculateMessage = (event: DecryptionParameters) => {
    return right(fastModularExponentiation(BigInt(event.c), BigInt(event.d), BigInt(event.n)))
}

const rightLongToBytes = (event: string) => {
    return right(longToBytes(event));
}

const decrypt = (event: DecryptionParameters) => {
    return pipe(
        calculateMessage(event),
        chain(rightLongToBytes)
    )
}

async function handler(event: APIGatewayEvent, context: Context) {
    return pipe(
            validateDecryptionParameters(event),
            chain(convertAPIEventToDecryptionParameters),
            chain(decrypt),
            fold(
                error => errorResponse(error),
                result => successResponse(StatusCodes.OK, result)
            )
        )
}

export { handler };