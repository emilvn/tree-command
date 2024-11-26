# File tree traversal tool

This tool traverses and prints out subdirectories and files in a given directory
using depth-first search.

## Usage

Clone the repository:

```bash
git clone https://github.com/emilvn/tree-command.git
```

Navigate to the project directory:

```bash
cd tree-command
```

Use the following command to run the tool: (replace `<path>` with the path to the directory you want to traverse)

```bash
npm start <path>
```

## Example

Running the following command while in this project directory:  
_(.git directory removed here for example purposes)_

```bash
npm start .
```

```text
.
   ├─ .gitignore
   ├─ package.json
   ├─ README.md
   └─ src
      ├─ datastructures
      │  ├─ Queue.js
      │  ├─ Stack.js
      │  └─ Tree.js
      └─ index.js
```
