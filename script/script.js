class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    let sortedArray = [... new Set(this.#mergeSort(array))];
    this.bst=this.#buildTree(sortedArray);
  }
  //Write insert(value) and deleteItem(value) functions that insert/delete the given value. You’ll have to deal with several cases for delete, such as when a node has children or not. If you need additional resources, check out these two articles on inserting and deleting, or this video on BST inserting/removing with several visual examples.
  insert(value){

  }
  deleteItem(value){

  }
  find(value){
    //Write a find(value) function that returns the node with the given value.
  }
  levelOrderForEach(callback){
    //Write a levelOrderForEach(callback) function that accepts a callback function as its parameter. levelOrderForEach should traverse the tree in breadth-first level order and call the callback on each node as it traverses, passing the whole node as an argument, similarly to how Array.prototype.forEach might work for arrays. levelOrderForEach may be implemented using either iteration or recursion (try implementing both!). If no callback function is provided, throw an Error reporting that a callback is required. Tip: You will want to use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list (video on level order traversal).
  }
  //Write inOrderForEach(callback), preOrderForEach(callback), and postOrderForEach(callback) functions that also accept a callback as a parameter. Each of these functions should traverse the tree in their respective depth-first order and pass each node to the provided callback. The functions should throw an Error if no callback is given as an argument, like with levelOrderForEach. The video Binary Tree Traversal: Preorder, Inorder, Postorder explains the topic clearly.
  inOrderForEach(callback){}
  preOrderForEach(callback){}
  postOrderForEach(callback){}
  height(value){
    //Write a height(value) function that returns the height of the node containing the given value. Height is defined as the number of edges in the longest path from that node to a leaf node. If the value is not found in the tree, the function should return null.
  }
  depth(value){
    //Write a depth(value) function that returns the depth of the node containing the given value. Depth is defined as the number of edges in the path from that node to the root node. If the value is not found in the tree, the function should return null.
  }
  isBalanced(){
    //Write an isBalanced function that checks if the tree is balanced. A binary tree is considered balanced if, for every node in the tree, the height difference between its left and right subtrees is no more than 1, and both the left and right subtrees are also balanced.
  }
  rebalance(){
    //Write a rebalance function that rebalances an unbalanced tree. Tip: You’ll want to use a traversal method to provide a new array to the buildTree function.
  }
  
  #buildTree(array,start=0,end=array.length-1){
    if(start>end){
        return null;
    }
    let mid = start + Math.floor((end-start)/2);
    let root = new Node(array[mid]);
    root.left = this.#buildTree(array,start,mid-1);
    root.right = this.#buildTree(array,mid+1,end);
    return root;
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

