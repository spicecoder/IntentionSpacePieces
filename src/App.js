import React from 'react';
//import ReactDOM from 'react-dom';
import IntentionGraph from './IntentionGraph'; // Adjust the path as necessary

const App = () => {
  const graphData = {
    nodes: [
      { id: 'DesignChunk1', type: 'DesignChunk', label: 'Design Chunk 1' },
      { id: 'Object1', type: 'Object', label: 'Object 1' },
      { id: 'Intention1', type: 'Intention', label: 'Intention 1' },
      { id: 'Link1', type: 'LinkLabel', label: 'emits' },
      { id: 'Link2', type: 'LinkLabel', label: 'reflects' },
      { id: 'Link3', type: 'LinkLabel', label: 'receives' },
    ],
    links: [
      { source: 'DesignChunk1', target: 'Link1' },
      { source: 'Link1', target: 'Intention1' },
      { source: 'Intention1', target: 'Link2' },
      { source: 'Link2', target: 'Object1' },
      { source: 'Object1', target: 'Link3' },
      { source: 'Link3', target: 'DesignChunk1' },
    ]
  };

  const handleNodeClick = (node) => {
    alert(`Node clicked: ${node.label}`);
  };

  return (
    <div>
      <h1>Intention Space Graph</h1>
      <IntentionGraph data={graphData} onNodeClick={handleNodeClick} />
    </div>
  );
};
export default App
