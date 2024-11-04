import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { SankeyController, Flow } from "chartjs-chart-sankey";
import { Chart } from "react-chartjs-2";
import { Box } from "@mui/material";
import { sankeyData } from "../config/chartDataConfig";

ChartJS.register(
  SankeyController,
  Flow,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const SankeyChart = ({ label, dataset, chartHeight, chartWidth }) => {
  const styles = {
    thinBorder: {
      border: "0.5px solid #E5E7EB",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
      backgroundColor: "rgba(255, 255, 255, 0.68)",
    },
  };

  const data = {
    labels: label,
    datasets: dataset ? [
      {
        label: "Sankey Chart",
        data: dataset,
      },
    ] : [{
      label: sankeyData.label,
      data: sankeyData.dataset,
    }],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          generateLabels: (chart) => {
            return chart.data.datasets.map((dataset, index) => {
              return {
                text: dataset.label || `Dataset ${index + 1}`,
                fillStyle: dataset.colorFrom,
                hidden: !chart.isDatasetVisible(index),
                lineWidth: 1,
              };
            });
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const { from, to, flow } = context.raw;
            return `${from} → ${to}: ${flow}`;
          },
        },
      },
    },
    elements: {
      line: {
        borderColor: "#000",
      },
    },
  };

  return (
    <Box
      sx={{
        height: chartHeight ? chartHeight : "400px",
        width: chartWidth ? chartWidth : "400px",
        border: styles.thinBorder,
        borderRadius: "20px",
        padding: "20px",
      }}
    >
      <Chart type="sankey" data={data} options={options} />
    </Box>
  );
};

export default SankeyChart;


// sankey new 
// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const EnergyFlowChart = () => {
//   const svgRef = useRef();

//   useEffect(() => {
//     if (svgRef.current) {
//       const svg = d3.select(svgRef.current);
//       const width = 1000;
//       const height = 600;
//       const centerX = width / 2;
//       const centerY = height / 2;

//       svg.selectAll("*").remove();

//       const data = {
//         sources: [
//           { name: 'Power Grid', value: 992, percentage: 79 },
//           { name: 'Solar', value: 188, percentage: 15 },
//           { name: 'DG', value: 75, percentage: 6 }
//         ],
//         destinations: [
//           { name: 'Science Center', value: 477, percentage: 38, equipment: [
//             { name: 'Equipment', value: 253, percentage: 20 },
//             { name: 'Incubators', value: 141, percentage: 11 },
//             { name: 'Fume Hoods', value: 83, percentage: 7 }
//           ]},
//           { name: 'Library', value: 609, percentage: 55, equipment: [
//             { name: 'HVAC', value: 453, percentage: 36 },
//             { name: 'Lighting', value: 237, percentage: 19 }
//           ]},
//           { name: 'Athletics Complex', value: 88, percentage: 7, equipment: [
//             { name: 'Gym Equipment', value: 45, percentage: 4 },
//             { name: 'Lighting', value: 43, percentage: 3 }
//           ]}
//         ],
//         totalConsumption: 1255
//       };

//       const colors = {
//         sources: '#FFA07A',
//         destinations: '#87CEFA',
//         equipment: '#DDA0DD',
//         links: { source : '#E6E6FA',destination : '#DDA0DD'}
//       };

//       // Draw center circle
//       svg.append('circle')
//         .attr('cx', centerX)
//         .attr('cy', centerY)
//         .attr('r', 60)
//         .attr('fill', 'white')
//         .attr('stroke', '#000')
//         .attr('stroke-width', 2);

//       svg.append('text')
//         .attr('x', centerX)
//         .attr('y', centerY - 10)
//         .attr('text-anchor', 'middle')
//         .text('Total Consumption')
//         .style('font-size', '12px');

//       svg.append('text')
//         .attr('x', centerX)
//         .attr('y', centerY + 10)
//         .attr('text-anchor', 'middle')
//         .text(`${data.totalConsumption} kWh`)
//         .style('font-size', '16px')
//         .style('font-weight', 'bold');

//       const linkArc = (d) => {
//         const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
//         return `
//           M${d.source.x},${d.source.y}
//           A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
//         `;
//       };

//       const nodes = [
//         ...data.sources.map((d, i) => ({ ...d, x: 100, y: 100 + i * 150, type: 'source' })),
//         ...data.destinations.map((d, i) => ({ ...d, x: width - 300, y: 100 + i * 200, type: 'destination' }))
//       ];

//       // Links from total consumption to sources
//       svg.selectAll('path.source-link')
//         .data(data.sources)
//         .enter()
//         .append('path')
//         .attr('class', 'source-link')
//         .attr('d', d => {
//           const sourceX = centerX;
//           const sourceY = centerY;
//           const targetX = 100;
//           const targetY = 100 + data.sources.indexOf(d) * 150;
//           return `M${sourceX},${sourceY} L${targetX},${targetY}`;
//         })
//         .attr('fill', 'none')
//         .attr('stroke', colors.links)
//         .attr('stroke-width', d => Math.sqrt(d.value) / 2);

//       // Links from total consumption to destinations
//       svg.selectAll('path.destination-link')
//         .data(data.destinations)
//         .enter()
//         .append('path')
//         .attr('class', 'destination-link')
//         .attr('d', d => {
//           const sourceX = centerX;
//           const sourceY = centerY;
//           const targetX = width - 300;
//           const targetY = 100 + data.destinations.indexOf(d) * 200;
//           return `M${sourceX},${sourceY} L${targetX},${targetY}`;
//         })
//         .attr('fill', 'none')
//         .attr('stroke', colors.links)
//         .attr('stroke-width', d => Math.sqrt(d.value) / 2);

//       const nodeGroups = svg.selectAll('g.main-node')
//         .data(nodes)
//         .enter()
//         .append('g')
//         .attr('class', 'main-node')
//         .attr('transform', d => `translate(${d.x},${d.y})`);

//       nodeGroups.append('circle')
//         .attr('r', 40)
//         .attr('fill', d => d.type === 'source' ? colors.sources : colors.destinations);

//       nodeGroups.append('text')
//         .attr('text-anchor', 'middle')
//         .attr('dy', '.3em')
//         .text(d => d.name)
//         .style('font-size', '12px');

//       nodeGroups.append('text')
//         .attr('text-anchor', 'middle')
//         .attr('dy', '1.5em')
//         .text(d => `${d.percentage}%`)
//         .style('font-size', '10px')
//         .style('font-weight', 'bold');

//       // Add equipment nodes
//       data.destinations.forEach((dest, i) => {
//         const equipmentGroups = svg.selectAll(`g.equipment-${i}`)
//           .data(dest.equipment)
//           .enter()
//           .append('g')
//           .attr('class', `equipment-${i}`)
//           .attr('transform', (d, j) => `translate(${width - 150}, ${100 + i * 200 + j * 60})`);

//         equipmentGroups.append('circle')
//           .attr('r', 25)
//           .attr('fill', colors.equipment);

//         equipmentGroups.append('text')
//           .attr('text-anchor', 'middle')
//           .attr('dy', '.3em')
//           .text(d => d.name)
//           .style('font-size', '10px');

//         equipmentGroups.append('text')
//           .attr('text-anchor', 'middle')
//           .attr('dy', '1.5em')
//           .text(d => `${d.percentage}%`)
//           .style('font-size', '9px')
//           .style('font-weight', 'bold');

//         // Add links from destination to equipment
//         svg.selectAll(`path.equipment-link-${i}`)
//           .data(dest.equipment)
//           .enter()
//           .append('path')
//           .attr('class', `equipment-link-${i}`)
//           .attr('d', d => {
//             const sourceX = width - 300;
//             const sourceY = 100 + i * 200;
//             const targetX = width - 150;
//             const targetY = 100 + i * 200 + dest.equipment.indexOf(d) * 60;
//             return `M${sourceX},${sourceY} L${targetX},${targetY}`;
//           })
//           .attr('fill', 'none')
//           .attr('stroke', colors.links)
//           .attr('stroke-width', 1);
//       });
//     }
//   }, []);

//   return (
//     <div>
//       <svg ref={svgRef} width={1000} height={600}></svg>
//       {/* Date picker and D/W/M/Y selector would go here */}
//     </div>
//   );
// };

// export default EnergyFlowChart;