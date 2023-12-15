// let x = [1, 2, 3, 4, 5, 6];
// let y = [1, 2, 3, 4, 5, 6];

let x_weight = [50, 50, 15, 5, 350];
let y_weight = [200, 50, 350, 350, 15];

let cheo_2 = 5;
let cheo_1 = 50;

var reward = new Array(x_weight.length);

for (var i = 0; i < x_weight.length; i++) {
  reward[i] = new Array(y_weight.length);
  for (var j = 0; j < y_weight.length; j++) {

    // WEIGHT
    reward[i][j] = x_weight[i] < y_weight[i] ? x_weight[j] : y_weight[i];

    if (i == j) reward[i][j] = reward[i][j] < cheo_1 ? reward[i][j] : cheo_1;
    if (i == 4 - j) reward[i][j] = reward[i][j] < cheo_2 ? reward[i][j] : cheo_2;
  }
}


console.table(reward);