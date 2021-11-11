import { gt } from 'lodash';
const {allPass, anyPass, compose, equals, filter, not, prop} = require('ramda');

/**
 * @file Домашка по FP ч. 1
 * 
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

//Functions that get an object field
const getStar = prop('star');
const getSquare = prop('square');
const getTriangle = prop('triangle');
const getCircle = prop('circle');
const getLength = prop('length');
const getAllFiguresColors = (figuresObject) => Object.values(figuresObject);

//Functions that check figures color
const isFigureWhite = equals('white');
const isFigureRed = equals('red');
const isFigureGreen = equals('green');
const isFigureBlue = equals('blue');
const isFigureOrange = equals('orange');
 
const isFigureNotWhite = compose(
    not, 
    isFigureWhite,
);
const isFigureNotRed = compose(
    not, 
    isFigureRed,
);

//Functions that check color of specific figure
const isStarRed = compose(
    isFigureRed,
    getStar
);
const isStarGreen = compose(
    isFigureGreen,
    getStar
);
const isStarOrange = compose(
    isFigureOrange,
    getStar
);

const isSquareGreen = compose(
    isFigureGreen,
    getSquare
);
const isSquareOrange = compose(
    isFigureOrange,
    getSquare
);

const isTriangleWhite = compose(
    isFigureWhite,
    getTriangle
);
const isTriangleGreen = compose(
    isFigureGreen,
    getTriangle
);
const isTriangleOrange = compose(
    isFigureOrange,
    getTriangle
);

const isCircleWhite = compose(
    isFigureWhite,
    getCircle
);
const isCircleGreen = compose(
    isFigureGreen,
    getCircle
);
const isCircleBlue = compose(
    isFigureBlue,
    getCircle
);
const isCircleOrange = compose(
    isFigureOrange,
    getCircle
);

//Function for counting colors of figures
const countFiguresColor = (color) => compose(
    getLength,
    filter(color),
    getAllFiguresColors
);

//Functions that count specific color figures
const getRedFiguresCount = countFiguresColor(isFigureRed);
const getGreenFiguresCount = countFiguresColor(isFigureGreen);
const getBlueFiguresCount = countFiguresColor(isFigureBlue);
const getOrangeFiguresCount = countFiguresColor(isFigureOrange);

//Functions that compare count if figures
const isMoreThanOne = (count) => gt(count, 1);
const isMoreThanTwo = (count) => gt(count, 2);

const isRedFiguresMoreThanTwo = compose(
    isMoreThanTwo,
    getRedFiguresCount
);
const isGreenFiguresMoreThanTwo = compose(
    isMoreThanTwo,
    getGreenFiguresCount
);
const isBlueFiguresMoreThanTwo = compose(
    isMoreThanTwo,
    getBlueFiguresCount
);
const isOrangeFiguresMoreThanTwo = compose(
    isMoreThanTwo,
    getOrangeFiguresCount
);
const isSquareTriangleEqualColor = (figureObject) => equals(getSquare(figureObject), getTriangle(figureObject));

//Specific functions
const isTriangleCircleWhite = allPass([isTriangleWhite, isCircleWhite]);
const isStarRedSquareGreen = allPass([isStarRed, isSquareGreen]);
const isStarNotWhite = compose(
    isFigureNotWhite,
    getStar
);
const isStarNotRed = compose(
    isFigureNotRed,
    getStar
);
const isSquareNotWhite = compose(
    isFigureNotWhite,
    getSquare
);
const isTriangleNotWhite = compose(
    isFigureNotWhite,
    getTriangle
);
const isTwoGreenFigures = compose(
    equals(2),
    getGreenFiguresCount
);
const isOneRedFigure = compose(
    equals(1),
    getRedFiguresCount
);

//Result validate functions
const isRedStarGreenSquareAnotherWhite = allPass([isStarRedSquareGreen(), isTriangleCircleWhite()]);
const isMinTwoFiguresGreen = compose(
    isMoreThanOne,
    getGreenFiguresCount
);
const isEqualRedBlueFigures = (figuresObject) => equals(getRedFiguresCount(figuresObject), getBlueFiguresCount(figuresObject));
const isBlueCircleRedStarOrangeSquare = allPass([isCircleBlue, isStarRed, isSquareOrange]);
const isThreeFiguresSameColorNotWhite = anyPass([isRedFiguresMoreThanTwo, isGreenFiguresMoreThanTwo, isBlueFiguresMoreThanTwo, isOrangeFiguresMoreThanTwo]);
const isTriangleAndAnotherGreenOneRed = allPass([isTwoGreenFigures, isTriangleGreen, isOneRedFigure]);
const isAllFiguresOrange = allPass([isStarOrange, isSquareOrange, isTriangleOrange, isCircleOrange]);
const isStarNotWhiteNotRed = allPass([isStarNotWhite, isStarNotRed]);
const isAllFiguresGreen = allPass([isStarGreen, isSquareGreen, isTriangleGreen, isCircleGreen]);
const isTriangleSquareSameColorNotWhite = allPass([isTriangleNotWhite, isSquareNotWhite, isSquareTriangleEqualColor]);

// 1. Red star, green square, all another - white.
export const validateFieldN1 = isRedStarGreenSquareAnotherWhite();

// 2. At least two figures green.
export const validateFieldN2 = isMinTwoFiguresGreen;

// 3. Count of red figures should be equal to count of blue.
export const validateFieldN3 = (figuresObject) => isEqualRedBlueFigures(figuresObject);

// 4. Blue circle, red star, orange square.
export const validateFieldN4 = isBlueCircleRedStarOrangeSquare();

// 5. Three figures have the same color other than white (four figures of the same color – it's also 'true').
export const validateFieldN5 = isThreeFiguresSameColorNotWhite();

// 6. Two green figures (one of them is triangle), and also one red figure.
export const validateFieldN6 = isTriangleAndAnotherGreenOneRed();

// 7. All figures are orange.
export const validateFieldN7 = isAllFiguresOrange();

// 8. The star is not white or red.
export const validateFieldN8 = isStarNotWhiteNotRed();

// 9. All figures are green.
export const validateFieldN9 = isAllFiguresGreen();

// 10. Triangle and square have the same color (not white).
export const validateFieldN10 = isTriangleSquareSameColorNotWhite();