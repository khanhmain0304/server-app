// const array = Array.from({ length: 5 }, () => Array(5).fill(0));

// const rowOdds = [200, 50, 350, 350, 15];

// const columnOdds = [50, 50, 15, 5, 350];

// const mainDiagonalOdds = 50;

// const secondaryDiagonalOdds = 5;

// // Lặp qua từng ô trong mảng 5x5
// for (let i = 0; i < 5; i++) {
//   for (let j = 0; j < 5; j++) {
//     let minOdds = Math.min(rowOdds[i], columnOdds[j]);
//     if (i === j) {
//       minOdds = Math.min(minOdds, mainDiagonalOdds);
//     }
//     if (i === 4 - j) {
//       minOdds = Math.min(minOdds, secondaryDiagonalOdds);
//     }
    
//     array[i][j] = minOdds;
//     console.log(array[i][j]);
//   }
// }

// // In mảng đã gán tỉ lệ
// console.log(array);


var array1 = ["a", "a", "a", "a", 4, "a", "a", 2, "a", 4];
var array2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (var i = 0; i < array1.length; i++) {
    if (typeof array1[i] === 'number') {
        array1.splice(i, 1); // Xóa phần tử số từ array1
        array2.splice(i, 1); // Xóa phần tử tương ứng từ array2
        i--; // Giảm i để cân nhắc lại vị trí sau khi xóa
    }
}

console.log("array1 sau khi xóa số:", array1);
console.log("array2 sau khi xóa số:", array2);