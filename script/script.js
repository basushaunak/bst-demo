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
    if (newNode.data < subTreeRoot.data) {
      if (subTreeRoot.left === null) {
        subTreeRoot.left = newNode;
      } else {
        this.#insertNode(subTreeRoot.left, newNode);
      }
    } else if (newNode.data > subTreeRoot.data) {
      if (subTreeRoot.right === null) {
        subTreeRoot.right = newNode;
      } else {
        this.#insertNode(subTreeRoot.right, newNode);
      }
    } else {
      console.log(`Duplicate value (${newNode.data}), skipping...`);
    }
  }
  deleteItem(value) {
    if (this.root === null) {
      return false;
    }
    let originalRoot = this.root;
    this.root = this.#deleteNode(this.root, value);
    return this.root !== originalRoot || this.find(value) === null;
  }

  #deleteNode(subTreeRoot, value) {
    if (subTreeRoot === null) return null;

    if (value < subTreeRoot.data) {
      subTreeRoot.left = this.#deleteNode(subTreeRoot.left, value);
    } else if (value > subTreeRoot.data) {
      subTreeRoot.right = this.#deleteNode(subTreeRoot.right, value);
    } else {
      // Node found
      if (!subTreeRoot.left) return subTreeRoot.right;
      if (!subTreeRoot.right) return subTreeRoot.left;

      // Two children → replace with inorder successor
      let successorNode = this.minNode(subTreeRoot.right);
      subTreeRoot.data = successorNode.data;
      subTreeRoot.right = this.#deleteNode(
        subTreeRoot.right,
        successorNode.data
      );
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
    } else if (subTreeRoot.data === value) {
      return subTreeRoot;
    } else if (value < subTreeRoot.data) {
      return this.#searchNode(subTreeRoot.left, value);
    } else if (value > subTreeRoot.data) {
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
  levelOrderForEach(callback, subTreeRoot = this.root) {
    if (typeof callback !== "function") {
      throw new Error("You must provide a callback function as an argument");
    }
    let queue = [];
    if (subTreeRoot) {
      queue = [subTreeRoot];
    }
    while (queue.length > 0) {
      const node = queue.shift(); // remove queue[0] from queue
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  //Write inOrderForEach(callback), preOrderForEach(callback), and
  // postOrderForEach(callback) functions that also accept a callback as a parameter.
  // Each of these functions should traverse the tree in their respective
  // depth-first order and pass each node to the provided callback.
  // The functions should throw an Error if no callback is given as an argument,
  // like with levelOrderForEach. The video Binary Tree Traversal: Preorder, Inorder,
  // Postorder explains the topic clearly.
  inOrderForEach(callback, subTreeRoot = this.root) {
    if (typeof callback !== "function") {
      throw new Error("You must provide a callback function as an argument");
    }
    let stack = [];
    let current = subTreeRoot;

    while (current || stack.length > 0) {
      while (current) {
        stack.push(current);
        current = current.left;
      }

      current = stack.pop();
      callback(current);
      current = current.right;
    }
  }

  preOrderForEach(callback, subTreeRoot = this.root) {
    if (typeof callback !== "function") {
      throw new Error("You must provide a callback function as an argument");
    }
    if (!subTreeRoot) return;
    let stack = [subTreeRoot];
    while (stack.length > 0) {
      let node = stack.pop();
      callback(node);
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
    }
  }
  postOrderForEach(callback, subTreeRoot = this.root) {
    if (typeof callback !== "function") {
      throw new Error("You must provide a callback function as an argument");
    }
    if (!subTreeRoot) return;

    let stack = [subTreeRoot];
    let result = [];

    while (stack.length > 0) {
      let node = stack.pop();
      result.push(node);
      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
    }

    result.reverse().forEach(callback);
  }
  //Write a height(value) function that returns the height of the node containing
  // the given value. Height is defined as the number of edges in the longest
  // path from that node to a leaf node. If the value is not found in the tree,
  // the function should return null.
  height(value) {
    const node = this.find(value);
    if (!node) return null;

    const calcHeight = (n) => {
      if (!n) return -1; // height of null = -1, leaf = 0
      return 1 + Math.max(calcHeight(n.left), calcHeight(n.right));
    };

    return calcHeight(node);
  }
  //Write a depth(value) function that returns the depth of the node containing
  // the given value. Depth is defined as the number of edges in the path from
  // that node to the root node. If the value is not found in the tree,
  // the function should return null.
  depth(value) {
    let depth = 0;
    let current = this.root;
    while (current) {
      if (current.data === value) return depth;
      depth++;
      current = value < current.data ? current.left : current.right;
    }
    return null; // not found
  }
  //Write an isBalanced function that checks if the tree is balanced.
  // A binary tree is considered balanced if, for every node in the tree,
  // the height difference between its left and right subtrees is no more than 1,
  // and both the left and right subtrees are also balanced.
  isBalanced(node = this.root) {
    if (!node) return true;

    let height = (n) => {
      if (!n) return -1;
      return 1 + Math.max(height(n.left), height(n.right));
    };

    let leftHeight = height(node.left);
    let rightHeight = height(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) return false;

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }
  //Write a rebalance function that rebalances an unbalanced tree.
  // Tip: You’ll want to use a traversal method to provide a new array to the
  // buildTree function.
  rebalance() {
    let values = [];
    this.inOrderForEach((node) => values.push(node.data));
    this.buildTree(values, true);
  }

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
