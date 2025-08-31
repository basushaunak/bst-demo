renderTree(container = document.getElementById("tree-container")) {
  container.innerHTML = "";
  const svg = document.getElementById("tree-lines");
  svg.innerHTML = "";

  const levelGap = 80; // vertical space
  const nodeGap = 50;  // horizontal base spacing

  const positions = new Map();

  // Recursively assign positions
  const assignPositions = (node, depth, x) => {
    if (!node) return x;

    // Traverse left
    x = assignPositions(node.left, depth + 1, x);

    // Current node position
    const pos = { x: x * nodeGap + 50, y: depth * levelGap + 50 };
    positions.set(node, pos);

    // Traverse right
    x = assignPositions(node.right, depth + 1, x + 1);

    return x;
  };

  assignPositions(this.root, 0, 0);

  // Draw nodes
  positions.forEach((pos, node) => {
    const nodeEl = document.createElement("div");
    nodeEl.className = "tree-node";
    nodeEl.textContent = node.data;
    nodeEl.style.left = pos.x + "px";
    nodeEl.style.top = pos.y + "px";
    container.appendChild(nodeEl);
  });

  // Draw lines
  positions.forEach((pos, node) => {
    if (node.left) {
      const childPos = positions.get(node.left);
      this.#drawLine(svg, pos, childPos);
    }
    if (node.right) {
      const childPos = positions.get(node.right);
      this.#drawLine(svg, pos, childPos);
    }
  });
}

// Private helper
#drawLine(svg, parentPos, childPos) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", parentPos.x + 20);
  line.setAttribute("y1", parentPos.y + 20);
  line.setAttribute("x2", childPos.x + 20);
  line.setAttribute("y2", childPos.y + 20);
  line.setAttribute("stroke", "#333");
  line.setAttribute("stroke-width", "2");
  svg.appendChild(line);
}
