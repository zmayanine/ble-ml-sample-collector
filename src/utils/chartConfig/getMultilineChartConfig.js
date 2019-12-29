import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

/**
 * AmCharts - Configuration for the multiline chart with 3 lines
 * @param chartData - Initial chart data
 * @param type - sensor type
 */
const getMultilineChartConfig = ({ chartData, type }) => {
  am4core.useTheme(am4themesAnimated);

  const chart = am4core.create(`chartdiv-${type}`, am4charts.XYChart);

  chart.data = chartData;
  chart.paddingRight = 20;
  chart.colors.list = [
    am4core.color('#3f51b5'),
    am4core.color('#f44336'),
    am4core.color('#4CAF50'),
  ];

  const sequenceAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  sequenceAxis.dataFields.category = 'sequence';
  sequenceAxis.renderer.grid.template.location = 0;

  const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.tooltip.disabled = true;
  valueAxis.renderer.minWidth = 35;

  const series1 = chart.series.push(new am4charts.LineSeries());
  series1.dataFields.categoryX = 'sequence';
  series1.dataFields.valueY = 'x';
  series1.name = 'X';
  series1.minBulletDistance = 20;
  let bullet = series1.bullets.push(new am4core.Circle());
  bullet.radius = 5;

  const series2 = chart.series.push(new am4charts.LineSeries());
  series2.dataFields.categoryX = 'sequence';
  series2.dataFields.valueY = 'y';
  series2.name = 'Y';
  series2.minBulletDistance = 20;
  bullet = series2.bullets.push(new am4core.Circle());
  bullet.radius = 5;

  const series3 = chart.series.push(new am4charts.LineSeries());
  series3.dataFields.categoryX = 'sequence';
  series3.dataFields.valueY = 'z';
  series3.name = 'Z';
  series3.minBulletDistance = 20;
  bullet = series3.bullets.push(new am4core.Circle());
  bullet.radius = 5;

  series1.tooltipText = '[BOLD]X:[/] {valueY.value}';
  series2.tooltipText = '[BOLD]Y:[/] {valueY.value}';
  series3.tooltipText = '[BOLD]Z:[/] {valueY.value}';
  chart.cursor = new am4charts.XYCursor();

  return chart;
};

export default getMultilineChartConfig;
