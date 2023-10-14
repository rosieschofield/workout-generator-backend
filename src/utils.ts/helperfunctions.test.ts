import { getRandIndexArr } from "./helperfunctions";

const indexArr1 = getRandIndexArr(3);
const indexArr2 = getRandIndexArr(4);
const indexArr3 = getRandIndexArr(5);

test("returns an array with the specified length", () => {
    expect(indexArr1.length).toEqual(3);
    expect(indexArr2.length).toEqual(4);
    expect(indexArr3.length).toEqual(5);
});

test("returns an array with unique numbers", () => {
    const uniqueSet1 = new Set(indexArr1);
    const uniqueSet2 = new Set(indexArr2);
    const uniqueSet3 = new Set(indexArr3);
    expect(uniqueSet1.size).toEqual(indexArr1.length);
    expect(uniqueSet2.size).toEqual(indexArr2.length);
    expect(uniqueSet3.size).toEqual(indexArr3.length);
});

test("returns an array with numbers between 1 and 51 inclusive", () => {
    const arrInRange1 = indexArr1.filter((num) => num > 0 && num <= 51);
    const arrInRange2 = indexArr2.filter((num) => num > 0 && num <= 51);
    const arrInRange3 = indexArr3.filter((num) => num > 0 && num <= 51);
    expect(arrInRange1.length).toEqual(indexArr1.length);
    expect(arrInRange2.length).toEqual(indexArr2.length);
    expect(arrInRange3.length).toEqual(indexArr3.length);
});
