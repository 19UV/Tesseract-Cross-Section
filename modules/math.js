var mult_mat_vec = (matrix, vector) => {
  const matrix_height = matrix.length;
  const matrix_width = matrix[0].length;
  var resp = [];
  for (var x=0;x<matrix_width;x++) {
    var m = 0;
    for (var y=0;y<matrix_height;y++) {
      m += matrix[x][y] * vector[y];
    }
    resp.push(m);
  }
  return resp;
}

export { mult_mat_vec };