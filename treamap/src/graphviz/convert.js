const fs = require('fs');

function jsonToGraphviz(filePath) {
  // Read JSON file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);
    let graphviz = `
graph {
    fontname="Helvetica"
    node [shape=record, fontname="Helvetica"];
    rankdir=TB;
    splines=false;
`;

    // Process each node
    jsonData.forEach(nodeData => {
      const { node, parent, views = 0, sales = 0, he_success_rate = 0.0, color } = nodeData;
      const invisible = false;
      const heSuccessRatePercent = (he_success_rate * 100).toFixed(2) + '%';
      const fillColor = color == 'red' ? '#FF8884' : color == 'blue' ? '#8bc34a' : 'silver';

      // Append to the graphviz string
      graphviz += `
    "${node}" [label=<{<B>${node}</B>|{${views}|${sales}}|{${heSuccessRatePercent}}}>, style=${invisible ? 'invis': 'filled'}, fillcolor="${fillColor}"];
    "${parent}" -- "${node}"${invisible ? ' [style=invis]' : ''};
`;
    });

    // Close the graph string
    graphviz += '}\n';

    console.log(graphviz);
  });
}

// Replace 'sample.json' with your actual file path
jsonToGraphviz('sample.json');
