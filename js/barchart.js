var Barchart = function() {
  this.width = 600;
  this.height = 400;
  this.barPadding = 1;
  this.labelPadding = 5;
};

Barchart.prototype.drawCategories = function(categories) {
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

	var maxCount = d3.max(categories, function(d) {
		return d.count;
	});

	var xScale = d3.scaleBand()
		.domain(d3.range(categories.length))
		.range([0, this.width])
		.paddingInner(0.05);

	var yScale = d3.scaleLinear()
		.domain([0, maxCount])
		.range([0, this.height]);

	// An array to hold rect data to be used to relatively position the label to the rect below
	var rectData = [];

	rects
		.attr('class', 'bar')
		.attr('x', function(d, i) {
			return xScale(i);
		})
		.attr('y', function(d) {
			return _this.height - yScale(d.count);
		})
		.attr('width', function(d, i) {
			return xScale.bandwidth();
		})
		.attr('height', function(d) {
			return yScale(d.count);
		})
		.each(function(d, i) {
			rectData[i] = this.getBBox(); // bbox;
		});

	labels
		.text(function(d) {
			return d.name;
		})
		.attr('class', 'label')
		.attr('text-anchor', '')
		.attr('y', function(d) {
			return _this.height - 12;
		})
		.attr('transform', function(d, i) {
			return 'rotate(270, ' + (xScale(i) + (xScale.bandwidth() / 1.5)) + ', ' + (_this.height - 12) + ')';
		})
		.each(function(d, i) {
			var bbox_label = this.getBBox();
			var bbox_rect = rectData[i];

			if ((bbox_label.width + (_this.labelPadding * 2)) > bbox_rect.height) {
				this.setAttribute('class', this.getAttribute('class') + ' label--exterior');
				this.setAttribute('x', xScale(i) + _this.labelPadding + bbox_rect.height);
			} else {
				this.setAttribute('x', xScale(i) + _this.labelPadding);
			}
		});
}
