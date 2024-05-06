import Plotly from 'plotly.js-dist-min';
import sam from "./data/sam-ae-ips.json";
import {CidrWrap} from './CidrWrap';
const {tree:originalTree} = sam;

const targetCidr = new CidrWrap('2a00:f28:480::/43');// new CidrWrap('37.245.0.0/16');  // new CidrWrap('37.245.208.0/20');


const tree = originalTree
  .filter(t => t.node.indexOf(":") !== -1)
  .map(t => ({...t, cidr: new CidrWrap(t.node)}))
  .filter(t => targetCidr.contains(t.cidr))
  .map(t => ({
    ...t,
    invisible: new CidrWrap('37.245.208.0/20').contains(t),
    label: `${t.node} ${Math.round(t.he_success_rate * 100)/100}%`
  }));

console.log(tree.map(t => ({
  node: t.node,
  parent: t.parent,
  views: t.views,
  sales: t.sales,
  he_success_rate: t.he_success_rate,
  color: t.color,
  invisible: new CidrWrap('37.245.192.0/20').contains(t.cidr)
})));

var data = [{
  type: 'treemap',
  labels: tree.map(t => t.node),
  parents: tree.map(t => t.parent || ''),
  values: tree.map(t => t.views), // These values determine the area size of each node
  customdata: tree,
  texttemplate: "<b>%{label}</b> %{customdata.he_success_rate:.0%}",
  textinfo: "label+value+percent entry",
  textposition: 'middle',
  textfont: {
    size: 12,
    color: 'white'
  },
  outsidetextfont: {
    size: 14,
    color: 'black'
  },
  insidetextfont: {
    size: 14,
    color: 'white'
  },
  hovertemplate: "<b>%{customdata.node}</b><br>%{customdata.views:,}<br>%{customdata.sales:,}<br>%{customdata.he_success_rate:.2%}<extra></extra>", // Hide default hover text by <extra></extra>
  outsidetextfont: {size: 20, color: "#377eb8"},
  marker: {
    // colors: tree.map(t => t.he_success_rate < 0.4 ? '#ff8884' :  '#8bc34a' ),
    colors: tree.map(t => t.color === 'red' ? '#ff8884' : t.color === 'blue' ? '#8bc34a' : t.color),
    // colors: tree.map(t => 'silver'),
    line: {width: 2}
  }
}];

var layout = {
  margin: {t: 8, l: 8, r: 8, b: 8},
};

Plotly.newPlot('myDiv', data, layout);
