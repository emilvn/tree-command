import { Queue } from "./Queue.js";
import Stack from "./Stack.js";

export default class Tree {
  root;

  constructor(data) {
    this.root = new TreeNode(data);
  }

  static bfsIterate(tree, cb) {
    const queue = new Queue();
    let start = tree.root;
    let current = start;
    queue.enqueue(current);
    while (queue.size() > 0) {
      current = queue.dequeue();
      cb(current, queue);
      if (current.branches.length > 0) {
        current.branches.forEach((b) => {
          queue.enqueue(b);
        });
      }
    }
  }

  static dfsIterate(tree, cb) {
    const stack = new Stack();
    const visited = new Set();
    let current = tree.root;
    stack.push({ node: current, depth: 0 });
    while (stack.size() > 0) {
      const { node, depth } = stack.pop();
      if (!visited.has(node.id)) {
        cb(node, stack, depth);
        visited.add(node.id);
      }
      if (node.branches.length > 0) {
        // start from end to make the branches be processed in the correct order as we are using a stack
        for (let i = node.branches.length - 1; i >= 0; i--) {
          const b = node.branches[i];
          if (!visited.has(b.id)) {
            stack.push({ node: b, depth: depth + 1 });
          }
        }
      }
    }
  }

  toString() {
    if (this.root.branches.length === 0) return "";
    let str = "";
    this.root.layer = 0;
    const branchTracker = [];
    Tree.dfsIterate(this, (current, _, depth) => {
      while (branchTracker.length <= depth) {
        branchTracker.push(false);
      }
      let indents = "";
      for (let i = 0; i < depth; i++) {
        indents += branchTracker[i] ? "│  " : "   ";
      }
      const parent = current.parent;
      if (parent) {
        const isLastBranch =
          parent.branches[parent.branches.length - 1] === current;
        if (isLastBranch) {
          str += indents + "└─ ";
          branchTracker[depth] = false;
        } else {
          str += indents + "├─ ";
          branchTracker[depth] = true;
        }
      }
      str += current.data + "\n";
    });
    return str;
  }
}

export class TreeNode {
  static ID_COUNTER = 1;
  parent = null;
  branches = [];
  constructor(data) {
    this.data = data;
    this.id = TreeNode.ID_COUNTER;
    TreeNode.ID_COUNTER++;
  }

  addBranches(...nodes) {
    nodes.forEach((n) => (n.parent = this));
    this.branches.push(...nodes);
  }

  getBranches() {
    return this.branches;
  }
}
