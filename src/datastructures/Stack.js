export default class Stack {
  _size = 0;
  /**
   * @param  {...Node} nodes list of nodes to store in Stack on construction. Will be stored in the same order as args.
   */
  constructor(...nodes) {
    if (nodes.length > 0) {
      this.tail = nodes[0];
      for (let i = 1; i < nodes.length; i++) {
        const current = nodes[i];
        current.prev = this.tail;
        this.tail = current;
      }
    }
    this._size = nodes.length;
  }

  /**
   * Returns an iterator that allows you to iterate over the stack
   * @returns {Iterator} iterator
   */
  [Symbol.iterator]() {
    let current = this.tail;
    return {
      next() {
        if (!current) {
          return { done: true };
        }
        const data = current.data;
        current = current.prev;
        return { value: data, done: false };
      },
    };
  }

  /**
   * Gets data at given index in stack
   * @param {number} index
   * @returns {unknown | undefined} data at index in stack or undefined if not found
   */
  get(index) {
    let node = this.tail;
    let i = 0;
    while (node) {
      if (i === index) {
        return node.data;
      }
      node = node.prev;
      i++;
    }
    return undefined;
  }

  /**
   * Adds data to the top of the stack
   * @param {any} data data to push to the stack
   */
  push(data) {
    const node = new Node(data);
    this.pushNode(node);
  }

  /**
   * Gets data at the top of the stack without removing it
   * @returns {unknown | undefined} data from top of the stack
   */
  peek() {
    return this.tail?.data;
  }

  /**
   * Removes and returns data from the top of the stack
   * @returns {unknown | undefined} data from the removed top of the stack
   */
  pop() {
    return this.popNode()?.data;
  }

  /**
   * Adds node to top of the stack
   * @param {Node} node
   */
  pushNode(node) {
    node.prev = this.tail;
    this.tail = node;
    this._size++;
  }

  /**
   * Gets node at top of the stack, without removing it
   * @returns {Node | null} node at the top of the stack
   */
  peekNode() {
    return this.tail;
  }

  /**
   * Removes and returns node at top of the stack
   * @returns {Node | null} the removed top node
   */
  popNode() {
    if (!this.tail) return null;
    const node = this.tail;
    this.tail = this.tail.prev;
    this._size--;
    return node;
  }

  /**
   * Gets current size of the stack
   * @returns {number} size of stack
   */
  size() {
    return this._size;
  }

  /**
   * Clears stack
   */
  clear() {
    this.tail = null;
    this._size = 0;
  }

  /**
   * Prints stack to console, primarily for debugging
   */
  dump() {
    let node = this.tail;
    let output = node?.data;
    while (node) {
      if (node !== this.tail) {
        output += " <- " + node.data;
      }
      node = node.prev;
    }
    console.log("Top: " + this.tail?.data);
    console.log("Stack: " + output);
  }
}

class Node {
  data;
  prev = null;
  constructor(data) {
    this.data = data;
  }
}
