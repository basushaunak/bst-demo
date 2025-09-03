class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(rootValue = null) {
    if (rootValue !== null) {
      this.root = new Node(rootValue);
    } else {
      this.root = null;
    }
  }
  //Write insert(value) and deleteItem(value) functions that insert/delete the given value. You’ll have to deal with several cases for delete, such as when a node has children or not. If you need additional resources, check out these two articles on inserting and deleting, or this video on BST inserting/removing with several visual examples.
  insert(value) {
    let newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    this.#insertNode(this.root, newNode);
  }
  #insertNode(subTreeRoot, newNode) {
    if (newNode.value < subTreeRoot.value) {
      if (subTreeRoot.left === null) {
        subTreeRoot.left = newNode;
      } else {
        this.#insertNode(subTreeRoot.left, newNode);
      }
    } else if (newNode.value > subTreeRoot.value) {
      if (subTreeRoot.right === null) {
        subTreeRoot.right = newNode;
      } else {
        this.#insertNode(subTreeRoot.right, newNode);
      }
    } else {
      console.log(`Duplicate value (${newNode.value}), skipping...`);
    }
  }
  deleteItem(value) {
    if (this.root === null) {
      return false;
    }
    this.#deleteNode(this.root, value);
  }

  #deleteNode(subTreeRoot, value) {
    if (subTreeRoot === null) return null;

    if (value < subTreeRoot.value) {
      subTreeRoot.left = this.deleteRec(subTreeRoot.left, value);
    } else if (value > subTreeRoot.value) {
      subTreeRoot.right = this.deleteRec(subTreeRoot.right, value);
    } else {
      // Node found
      if (!subTreeRoot.left) return subTreeRoot.right;
      if (!subTreeRoot.right) return subTreeRoot.left;

      // Two children → replace with inorder successor
      let successorValue = this.min(subTreeRoot.right);
      subTreeRoot.value = successorValue;
      subTreeRoot.right = this.deleteRec(subTreeRoot.right, successorValue);
    }
    return subTreeRoot;
  }

  find(value) {
    //Write a find(value) function that returns the node with the given value.
    return this.#searchNode(this.root, value);
  }
  #searchNode(subTreeRoot, value) {
    if (subTreeRoot === null) {
      return null;
    } else if (subTreeRoot.value === value) {
      return subTreeRoot;
    } else if (value < subTreeRoot.value) {
      return this.#searchNode(subTreeRoot.left, value);
    } else if (value > subTreeRoot.value) {
      return this.#searchNode(subTreeRoot.right, value);
    }
  }
  //Write a levelOrderForEach(callback) function that accepts a callback function
  //  as its parameter. levelOrderForEach should traverse the tree in
  // breadth-first level order and call the callback on each node as it traverses,
  // passing the whole node as an argument, similarly to how
  // Array.prototype.forEach might work for arrays. levelOrderForEach may be
  // implemented using either iteration or recursion (try implementing both!).
  // If no callback function is provided, throw an Error reporting that a
  // callback is required. Tip: You will want to use an array acting as a queue
  // to keep track of all the child nodes that you have yet to traverse and to
  // add new ones to the list (video on level order traversal).
  levelOrderForEach(callback) {
    if (callback === null) {
      throw "You must provide a callback function as an argument";
    }
  }
  //Write inOrderForEach(callback), preOrderForEach(callback), and
  // postOrderForEach(callback) functions that also accept a callback as a parameter.
  // Each of these functions should traverse the tree in their respective
  // depth-first order and pass each node to the provided callback.
  // The functions should throw an Error if no callback is given as an argument,
  // like with levelOrderForEach. The video Binary Tree Traversal: Preorder, Inorder,
  // Postorder explains the topic clearly.
  inOrderForEach(callback) {
    if (callback === null) {
      throw new Error("You must provide a callback function as an argument");
    }
  }
  preOrderForEach(callback) {
    if (callback === null) {
      throw new Error("You must provide a callback function as an argument");
    }
  }
  postOrderForEach(callback) {
    if (callback === null) {
      throw new Error("You must provide a callback function as an argument");
    }
  }
  //Write a height(value) function that returns the height of the node containing
  // the given value. Height is defined as the number of edges in the longest
  // path from that node to a leaf node. If the value is not found in the tree,
  // the function should return null.
  height(value) {}
  //Write a depth(value) function that returns the depth of the node containing
  // the given value. Depth is defined as the number of edges in the path from
  // that node to the root node. If the value is not found in the tree,
  // the function should return null.
  depth(value) {}
  //Write an isBalanced function that checks if the tree is balanced.
  // A binary tree is considered balanced if, for every node in the tree,
  // the height difference between its left and right subtrees is no more than 1,
  // and both the left and right subtrees are also balanced.
  isBalanced() {}
  //Write a rebalance function that rebalances an unbalanced tree.
  // Tip: You’ll want to use a traversal method to provide a new array to the
  // buildTree function.
  rebalance() {}

  //Returns the node with the minimum value in the sub tree
  minNode(subTreeRoot = this.root) {
    if (subTreeRoot === null) {
      return null;
    }
    let currentNode = subTreeRoot;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode;
  }

  //Returns the node with the maximum value in the sub tree
  maxNode(subTreeRoot = this.root) {
    if (subTreeRoot === null) {
      return null;
    }
    let currentNode = subTreeRoot;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode;
  }

  //Builds a BST from an array, if the array is not sorted, it will sort the array
  // and make it unique (no duplicate values).
  buildTree(array, isSorted = false) {
    let sortedArray = [];
    if (isSorted) {
      sortedArray = array;
    } else {
      sortedArray = [...new Set(this.#mergeSort(array))]; // Sorts the array and removes any duplicates from it
    }
    this.root = this.#buildSubTree(sortedArray);
  }

  //Prints the tree in the console
  printTree(node = this.root, prefix = "", isLeft = true) {
    if (node === null) return;

    if (node.right !== null) {
      this.printTree(node.right, prefix + (isLeft ? "│   " : "    "), false);
    }

    console.log(prefix + (isLeft ? "└── " : "┌── ") + node.data);

    if (node.left !== null) {
      this.printTree(node.left, prefix + (isLeft ? "    " : "│   "), true);
    }
  }
  //Renders the tree on the current webpage.
  renderTree(container = document.getElementById("tree-container")) {
    container.innerHTML = "";
    const svg = document.getElementById("tree-lines");
    svg.innerHTML = "";

    const levelGap = 80; // vertical space
    const nodeGap = 50; // horizontal base spacing

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

  #buildSubTree(array, start = 0, end = array.length - 1) {
    if (start > end) {
      return null;
    }
    let mid = Math.floor((end + start) / 2);
    let newNode = new Node(array[mid]);
    newNode.left = this.#buildSubTree(array, start, mid - 1);
    newNode.right = this.#buildSubTree(array, mid + 1, end);
    return newNode;
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

  #mergeSort(array) {
    const n = array.length;

    if (n <= 1) {
      return array;
    }
    const mid = Math.floor(n / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid);

    const sortedLeft = this.#mergeSort(left);
    const sortedRight = this.#mergeSort(right);
    return this.#merge(sortedLeft, sortedRight);
  }

  #merge(left, right) {
    const result = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }

    while (i < left.length) {
      result.push(left[i++]);
    }
    while (j < right.length) {
      result.push(right[j++]);
    }
    return result;
  }
}

function generateArray(numberOfItems = 10, upperLimit = 100) {
  return Array.from({ length: numberOfItems }, () =>
    Math.floor(Math.random() * upperLimit + 1)
  );
}
