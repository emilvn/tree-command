import { log } from "node:console";
import Tree, { TreeNode } from "./datastructures/Tree.js";
import fs from "node:fs";
import Stack from "./datastructures/Stack.js";

const startPath = process.argv[2];
dfsFileTreeTraversal(startPath);

/**
 * Creates a tree of subdirectories from startpath and logs it while running
 * @param {string} startPath path to start at
 * @returns {Tree} tree datastructure containing the filepath
 */
function dfsFileTreeTraversal(startPath) {
  const tree = new Tree(startPath);

  // to keep track of whether to put vertical lines at indent depths
  // each index represents depth, fx. if branchTracker[2] is true we put a | at that indent position
  const branchTracker = [];

  const stack = new Stack();
  const visited = new Set();

  stack.push({ fileNode: tree.root, depth: 0 });
  while (stack.size() > 0) {
    const { fileNode, depth } = stack.pop();
    if (!visited.has(fileNode.id)) {
      printCurrentFileNode(fileNode, depth, branchTracker);
      visited.add(fileNode.id);
    }
    let files;
    try {
      files = fs.readdirSync(fileNode.data);
    } catch (e) {
      // was probably not a directory
      continue;
    }
    if (!files || files.length === 0) {
      continue;
    }
    // we need the whole relative path for readdir to work.
    fileNode.addBranches(
      ...files.map(
        (f) =>
          new TreeNode(
            `${fileNode.data}${fileNode.data.endsWith("/") ? "" : "/"}${f}`
          )
      )
    );
    if (fileNode.branches.length > 0) {
      // push files to stack starting from end to make the files be processed in the correct order
      for (let i = fileNode.branches.length - 1; i >= 0; i--) {
        const newFileNode = fileNode.branches[i];
        if (!visited.has(newFileNode.id)) {
          stack.push({ fileNode: newFileNode, depth: depth + 1 });
        }
      }
    }
  }
  return tree;
}

function printCurrentFileNode(currentFileNode, depth, branchTracker) {
  let str = "";
  while (branchTracker.length <= depth) {
    branchTracker.push(false);
  }
  let indents = "";
  for (let i = 0; i < depth; i++) {
    indents += branchTracker[i] ? "│  " : "   ";
  }
  const parent = currentFileNode.parent;
  if (parent) {
    const isLastBranch =
      parent.branches[parent.branches.length - 1] === currentFileNode;
    if (isLastBranch) {
      str += indents + "└─ ";
      branchTracker[depth] = false;
    } else {
      str += indents + "├─ ";
      branchTracker[depth] = true;
    }
  }
  const lastBackslashIndex = currentFileNode.data.lastIndexOf("/");
  str += currentFileNode.data.substring(
    lastBackslashIndex + 1,
    currentFileNode.data.length
  );
  log(str);
}
