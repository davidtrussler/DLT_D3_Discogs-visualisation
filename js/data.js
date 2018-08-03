/*
 * data.js
 * gets the data requested via ajax and passes it on to the required drawing class
**/

var Data = function() {
  this.base_url = 'https://api.discogs.com/users/davidTrussler/collection';
  this.token = 'whKeouEYlyPpfzmYshRvfbFYlwqBtflZYLziIWyl';
};

Data.prototype.getCategories = function() {
  console.log('getCategories!');

  var _this = this;
  var url = this.base_url + '/folders?token=' + this.token;

  $.get(url, function(response) {
    _this._parseResponse(response);

    // error handling etc.
  });
}

Data.prototype._parseResponse = function(response) {
  // remove categories: all, uncategorised
  var categories = [];
  var barchart = new Barchart();
  // var piechart = new Piechart();

  response.folders.forEach(function(folder) {
    if (folder.name !== 'All' && folder.name !== 'Uncategorized') {
      categories.push(folder);
    }
  });

  barchart.drawCategories(categories);
  // piechart.draw(categories);
}
