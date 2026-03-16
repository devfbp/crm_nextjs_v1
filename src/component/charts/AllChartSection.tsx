"use client";
import React from "react";
import AreaChartComponent from "./AreaChartComponent";
import BarChartComponent from "./BarChartComponent";
import BubbleChartComponent from "./BubbleChartComponent";
import ColumnChartComponent from "./ColumnChartComponent";
import CustomContentOfTooltipChart from "./CustomContentOfTooltip";
import LineChartComponent from "./LineChartComponent";
import MixedChartComponent from "./MixedChartComponent";
import ScatterChartComponent from "./ScatterChartComponent";
import MultipleYAxesScatterChartComponent from "./MultipleYAxesScatterChartComponent";
import ScatterChartWithCells from "./ScatterChartWithCells";
import TwoLevelPieChart from "./TwoLevelPieChart";
import TwoSimplePieChart from "./TwoSimplePieChart";
import SimpleRadarChart from "./SimpleRadarChart";
import SimpleRadialBarChart from "./SimpleRadialBarChart";
import SimpleTreemap from "./SimpleTreemapChart";
import LegendEffectChartComponent from "./LegendEffectChartComponent";

const AllChartSection = () => {
  return (
    <div className="row row-gap-4">
      <div className="col-lg-6">
        <div className="panel chart-panel-1">
          <div className="panel-header">
            <h5>Line chart</h5>
          </div>
          <div className="panel-body">
            <div id="lineChart">
              <LineChartComponent />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="panel chart-panel-1">
          <div className="panel-header">
            <h5>Area chart</h5>
          </div>
          <div className="panel-body">
            <div id="areaChart">
              <AreaChartComponent />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="panel chart-panel-1">
          <div className="panel-header">
            <h5>Column chart</h5>
          </div>
          <div className="panel-body">
            <div id="columnChart">
              <ColumnChartComponent />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="panel chart-panel-1">
          <div className="panel-header">
            <h5>Bar chart</h5>
          </div>
          <div className="panel-body">
            <div id="barChart">
              <BarChartComponent />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="panel chart-panel-1">
          <div className="panel-header">
            <h5>Mixed chart</h5>
          </div>
          <div className="panel-body">
            <div id="mixedChart">
              <MixedChartComponent />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="panel chart-panel-1">
          <div className="panel-header">
            <h5>Scatter Chart</h5>
          </div>
          <div className="panel-body">
            <div id="scatterChart">
              <ScatterChartComponent />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="panel chart-panel-1">
          <div className="panel-header">
            <h5>Bubble Chart</h5>
          </div>
          <div className="panel-body">
            <div id="bubbleChart">
              <BubbleChartComponent />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="panel chart-panel-1">
          <div className="panel-header">
            <h5>Multiple Y Axis Scatter Chart</h5>
          </div>
          <div className="panel-body">
            <div id="multipleYAxesScatterChartChart">
              <MultipleYAxesScatterChartComponent />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="panel chart-panel-1">
          <div className="panel-header">
            <h5>Scatter Chart With Cells</h5>
          </div>
          <div className="panel-body">
            <div id="scatterChartWithCells">
              <ScatterChartWithCells />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="panel chart-panel-1">
          <div className="panel-header">
            <h5>Two Level Pie Chart</h5>
          </div>
          <div className="panel-body">
            <div id="twoLevelPieChart">
              <TwoLevelPieChart />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="panel chart-panel-1">
          <div className="panel-header">
            <h5>Two Simple Pie Chart</h5>
          </div>
          <div className="panel-body">
            <div id="twoSimplePieChart">
              <TwoSimplePieChart />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="panel chart-panel-2">
          <div className="panel-header">
            <h5>Simple Radar Chart</h5>
          </div>
          <div className="panel-body">
            <div id="simpleRadarChart">
              <SimpleRadarChart />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="panel">
          <div className="panel-header">
            <h5>Simple Radial Bar Chart</h5>
          </div>
          <div className="panel-body">
            <div id="simpleRadialBarChart">
              <SimpleRadialBarChart />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="panel">
          <div className="panel-header">
            <h5>Simple Treemap Chart</h5>
          </div>
          <div className="panel-body">
            <div id="simpleTreemapChart">
              <SimpleTreemap />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="panel">
          <div className="panel-header">
            <h5>Custom Content Of Tooltip Chart</h5>
          </div>
          <div className="panel-body pb-0">
            <div id="customContentOfTooltipChart">
              <CustomContentOfTooltipChart />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="panel">
          <div className="panel-header">
            <h5>Legend Effect Opacity Chart</h5>
          </div>
          <div className="panel-body pb-0">
            <div id="legendEffectOpacity">
              <LegendEffectChartComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllChartSection;
