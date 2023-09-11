export function getRandIndexArr(length: number): number[] {
    const randIndexArr: number[] = [];
    let randomIndex: number;
    while (randIndexArr.length < length) {
        do {
            randomIndex = Math.floor(Math.random() * 51);
        } while (randIndexArr.find((num) => num === randomIndex));
        randIndexArr.push(randomIndex);
    }
    return randIndexArr;
}
