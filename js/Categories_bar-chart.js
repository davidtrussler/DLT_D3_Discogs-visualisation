var Barchart = function() {};

Barchart.prototype.drawChart = function() {
	var _this = this;

	var svg = d3.select('body')
		.append('svg')
		.attr('class', 'barchart')
		.attr('width', this.width)
		.attr('height', this.height);

	var rects = svg.selectAll('rect')
		.data(this.dataset)
		.enter()
		.append('rect');

	var labels = svg.selectAll('text')
		.data(this.dataset)
		.enter()
		.append('text');

	rects
		.attr('class', 'bar')
		.attr('x', function(d, i) {
			return i * (_this.width / _this.dataset.length);
		})
		.attr('y', function(d) {
			return _this.height - d;
		})
		.attr('width', function(d, i) {
			return _this.width / _this.dataset.length - _this.barPadding;
		})
		.attr('height', function(d) {
			return d;
		});

	labels
		.text(function(d) {
			return d;
		})
		.attr('class', 'label')
		.attr('text-anchor', 'middle')
		.attr('x', function(d, i) {
			return i * (_this.width / _this.dataset.length) + (_this.width / _this.dataset.length - _this.barPadding) / 2;
		})
		.attr('y', function(d) {
			return _this.height - d + 12;
		});
}
