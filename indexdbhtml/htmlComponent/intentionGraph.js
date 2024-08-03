class IntentionGraph {
    constructor(container, config) {
      this.container = container;
      this.config = config;
      this.init();
    }
  
    getNodeColor(node) {
      switch (node.type) {
        case 'DesignChunk':
          return 'blue';
        case 'Object':
          return 'green';
        case 'Intention':
          return 'red';
        case 'LinkLabel':
          return 'orange';
        default:
          return 'gray';
      }
    }
  
    drawTrapezium(ctx, x, y, width, height) {
      ctx.beginPath();
      ctx.moveTo(x - width / 2, y + height / 2);
      ctx.lineTo(x + width / 2, y + height / 2);
      ctx.lineTo(x + width / 4, y - height / 2);
      ctx.lineTo(x - width / 4, y - height / 2);
      ctx.closePath();
      ctx.fill();
    }
  
    drawNode(node, ctx, globalScale) {
      const label = node.label;
      const fontSize = 12 / globalScale;
      ctx.font = `${fontSize}px Sans-Serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
  
      // Draw different shapes
      switch (node.type) {
        case 'LinkLabel':
          ctx.fillStyle = this.getNodeColor(node);
          this.drawTrapezium(ctx, node.x, node.y, 20, 10); // Draw trapezium for LinkLabel
          break;
        default:
          ctx.fillStyle = this.getNodeColor(node);
          ctx.beginPath();
          ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false); // Draw circle for others
          ctx.fill();
          break;
      }
  
      // Draw text
      ctx.fillStyle = 'black';
      ctx.fillText(label, node.x, node.y - 10);
    }
  
    init() {
      const container = document.getElementById(this.container);
  
      ForceGraph()(container)
        .width(this.config.width)
        .height(this.config.height)
        .graphData(this.config.data)
        .nodeLabel("label")
        .nodeAutoColorBy("type")
        .nodeCanvasObject((node, ctx, globalScale) => this.drawNode(node, ctx, globalScale))
        .linkDirectionalArrowLength(6)
        .linkDirectionalArrowRelPos(1)
        .linkWidth(2)
        .linkDirectionalParticles(2)
        .onNodeClick(this.config.onNodeClick);
    }
  }
  
  window.IntentionGraph = IntentionGraph;
  