/**
 * @file Домашка по FP ч. 2
 * 
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 * 
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 * 
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from '../tools/api';
const {allPass, andThen, compose, gt, length, lt, not, prop, tap, test, when} = require('ramda');


const api = new Api();

//Functions that get object fields
const getValue = prop('value');
const getWriteLog = prop('writeLog');
const getHandleSuccess = prop('handleSuccess');
const getHandleError = prop('handleError');
const getResultData = prop('result');

//Functions that compare numbers
const isMoreThanTwo = lt(2);
const isLessThanTen = gt(10);
const isPositive = lt(0);

//Functions that check input value
const checkInputValueLength = allPass([isLessThanTen, isMoreThanTwo]);
const isInputValueLengthValid = compose(
    checkInputValueLength,
    length
);
const checkInputValueNumber = test(/^\d+(\.\d+)?$/);
const checkInputValueValid = allPass([isInputValueLengthValid, isPositive, checkInputValueNumber]);
const isInputValueValid = compose(
    checkInputValueValid,
    getValue
);
const isInputValueNotValid = compose(
    not,
    isInputValueValid
);

//Functions that make math operatons
const getMathRoundValue = compose(
    Math.round,
    parseFloat,
    getValue
);
const getApiTech = api.get('https://api.tech/numbers/base');
const getBinaryFromDecimal = (inputValue) => getApiTech({from: 10, to: 2, number: inputValue});
const getPowNumber = (inputValue) => Math.pow(inputValue, 2);
const getRemainderOfDivisionByThree = (inputValue) => inputValue % 3;

//Additional functions
const logInputError = (inputData) => getHandleError(inputData)('ValidationError');
const getAnimalById = (id) => api.get(`https://animals.tech/${id}`)({});

//Main block
const processSequence = (inputData) => {
    const writeLogData = getWriteLog(inputData);
    const getSuccessData = getHandleSuccess(inputData);
    const logData = compose(
        writeLogData,
        getValue
    );

    const result = compose(
        when(
            isInputValueValid,
            compose(
                andThen(getSuccessData),
                andThen(getResultData),
                andThen(getAnimalById),
                andThen(tap(writeLogData)),
                andThen(getRemainderOfDivisionByThree),
                andThen(tap(writeLogData)),
                andThen(getPowNumber),
                andThen(tap(writeLogData)),
                andThen(length),
                andThen(tap(writeLogData)),
                andThen(getResultData),
                getBinaryFromDecimal,
                tap(writeLogData),
                getMathRoundValue
            )
        ),
        when(
            isInputValueNotValid,
            tap(logInputError)
        ),
        tap(logData)
    );

    result(inputData);
}

export default processSequence;
