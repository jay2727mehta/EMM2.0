import Tempgadget from './tempgad';
import BarChart from './barchart';
import LineChart from './lineChart';
import PieChart from './piechart';

 const gadgets = [
  { name: 'energy', component: <Tempgadget/> },
  { name: 'energy', component: <BarChart/> },
  { name: 'line', component: <LineChart/> },
  { name: 'pie', component: <PieChart/> },
];

export default gadgets