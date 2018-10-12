/*
 * data.js
 * gets the data requested via ajax and passes it on to the required drawing class
**/

var Data = function() {
  // Local, for development
  this.base_url = 'src/response.json';
  // Production, uses live data
  // this.base_url = 'https://api.discogs.com/users/davidTrussler/collection';
  this.token = 'whKeouEYlyPpfzmYshRvfbFYlwqBtflZYLziIWyl';
  this.response = null;
  this.delay = 10;
};

Data.prototype.getCategories = function() {
  console.log('getCategories!');
  console.log(Barchart);

  var _this = this;

  // Local, for development
  var url = this.base_url;
  // Production, uses live data
  // var url = this.base_url + '/folders?token=' + this.token;

  $.get(url, function(response) {
    // Barchart.response = response;
    // _this._parseResponse(Barchart.response);
    _this._parseResponse(response);

    // error handling etc.
  });
}

Data.prototype._parseResponse = function(response) {
  var _this = this;

  this.barchart = new Barchart();

  response.folders.forEach(function(folder) {
    if (folder.name !== 'All' && folder.name !== 'Uncategorized') {
      _this.barchart.categories.push(folder);
    }
  });

  this.barchart.drawCategories();

  // Draw chart on resize
  $(window).on('resize', _this.debounce(_this.barchart.drawCategories, _this.delay, _this.barchart));
}

Data.prototype.debounce = function(func, wait, self) {
  var timeout;

  return function() {
    var context = self,
      args = arguments,
      later = function() {
        timeout = null;
        func.apply(context, args);
      };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

