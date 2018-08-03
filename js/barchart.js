var Barchart = function() {
  this.width = 500;
  this.height = 300;
  this.barPadding = 1;
};

Barchart.prototype.drawCategories = function(categories) {
	console.log('categories: ', categories);

	var _this = this;

	var svg = d3.select('body')
		.append('svg')
		.attr('class', 'barchart')
		.attr('width', this.width)
		.attr('height', this.height);

	var rects = svg.selectAll('rect')
		.data(categories)
		.enter()
		.append('rect');

	var labels = svg.selectAll('text')
		.data(categories)
		.enter()
		.append('text');

	rects
		.attr('class', 'bar')
		.attr('x', function(d, i) {
			return i * (_this.width / categories.length);
		})
		.attr('y', function(d) {
			return _this.height - d.count;
		})
		.attr('width', function(d, i) {
			return _this.width / categories.length - _this.barPadding;
		})
		.attr('height', function(d) {
			return d.count;
		});

	// labels
	// 	.text(function(d) {
	// 		return d;
	// 	})
	// 	.attr('class', 'label')
	// 	.attr('text-anchor', 'middle')
	// 	.attr('x', function(d, i) {
	// 		return i * (_this.width / categories.length) + (_this.width / categories.length - _this.barPadding) / 2;
	// 	})
	// 	.attr('y', function(d) {
	// 		return _this.height - d + 12;
	// 	});
}
