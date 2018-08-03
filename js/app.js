window.addEventListener('DOMContentLoaded', init);

function init() {
  console.log('init!');

  // var barchart = new Barchart();
  var data = new Data();

  // barchart.dataset = [20, 16, 48, 40, 52, 24, 60, 72, 16, 80, 48, 88, 95, 84, 48];
  // barchart.width = 500;
  // barchart.height = 200;
  // barchart.barPadding = 1;

  // barchart.drawChart();
  data.getCategories();
}
