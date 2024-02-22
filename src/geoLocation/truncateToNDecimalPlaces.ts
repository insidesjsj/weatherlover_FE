// 소수점 n자리 이하의 수를 버리는 함수
export const truncateToNDecimalPlaces = (number: number, n: number): String => {
    const factor = Math.pow(10, n);
    return (Math.trunc(number * factor) / factor).toString();
};