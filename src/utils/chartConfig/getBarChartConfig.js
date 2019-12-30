import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

const colorAdapter = (target, chart) => {
  if (target.dataItem.index === 0) {
    return 'red';
  }
  if (target.dataItem.index === 1) {
    return 'green';
  }
  if (target.dataItem.index === 2) {
    return 'blue';
  }

  return chart.colors.getIndex(target.dataItem.index);
};

/**
 * AmCharts - Configuration for the bar chart
 * @param chartData - Initial chart data
 * @param type - sensor type
 */
const getBarChartConfig = ({ chartData, type }) => {
  am4core.useTheme(am4themesAnimated);

  const chart = am4core.create(`chartdiv-${type}`, am4charts.XYChart);

  chart.data = chartData;

  const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = 'color';
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.minGridDistance = 30;

  const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.min = 0;

  // Create series
  const series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueY = 'value';
  series.dataFields.categoryX = 'color';
  series.name = 'Value';
  series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]';
  series.columns.template.fillOpacity = 0.8;

  series.columns.template.adapter.add('fill', (_, target) => colorAdapter(target, chart));
  series.columns.template.adapter.add('stroke', (_, target) => colorAdapter(target, chart));

  const columnTemplate = series.columns.template;
  columnTemplate.strokeWidth = 2;
  columnTemplate.strokeOpacity = 1;

  return chart;
};

export default getBarChartConfig;
