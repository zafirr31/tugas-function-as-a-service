import { chain, fold } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { APIGatewayEvent, Context } from 'aws-lambda'
import { ApplicationError, StatusCodes, errorResponse, successResponse } from "./http"
import { Either, left, right } from "fp-ts/Either";
import { fastModularExponentiation, inverseModulo, bytesToLong } from "./helpers"
import { primeSync as getRandomPrime } from 'bigint-crypto-utils'

type EncryptionParameters = {
    m: string,
};

const paramsNotNull = (event: APIGatewayEvent) => {
    if(event.queryStringParameters.m == null)    {
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

const validateEncryptionParameters = (event: APIGatewayEvent): Either<ApplicationError, APIGatewayEvent> => {
    return pipe(
        paramsNotNull(event)
    )
}

const calculatePublicKey = (event) => {
    return right(
        {
            ...event,
            n: (BigInt(event.p) * BigInt(event.q)).toString(),
            e: "65537"
        }
    )
}

const calculatePrivateKey = (event) => {
    try {
        return right(
            {
                ...event,
                d: inverseModulo(event.e, ((BigInt(event.p)-BigInt(1)) * (BigInt(event.q)-BigInt(1))).toString()).toString()
            }
        )
    }
    catch   {
        return left(new ApplicationError(
            'Error calculating modular inverse',
            ['Error calculating modular inverse'],
            StatusCodes.SERVER_ERROR
        ))
    }
}

const calculateEncryptedMessage = (event) => {
    return right(
        {
            ...event,
            c: fastModularExponentiation(BigInt(event.m), BigInt(event.e), BigInt(event.n)).toString()
        }
    )

}

const encrypt = (event: EncryptionParameters) => {
    // Forced to not be pure functional
    // Value of function parameter is 2**256
    var p = getRandomPrime(512).toString()
    var q = getRandomPrime(512).toString()
    return pipe(
        calculatePublicKey({p:p, q:q, m:event.m}),
        chain(calculatePrivateKey),
        chain(calculateEncryptedMessage)
    )
}

const convertAPIEventToEncryptParameters = (event: APIGatewayEvent) => {
    return right<ApplicationError, EncryptionParameters>({
        m: bytesToLong(event.queryStringParameters.m).toString()
    });
}

async function handler(event: APIGatewayEvent, context: Context) {
    return pipe(
            validateEncryptionParameters(event),
            chain(convertAPIEventToEncryptParameters),
            chain(encrypt),
            fold(
                error => errorResponse(error),
                result => successResponse(StatusCodes.OK, result)
            )
        )
}

export { handler };