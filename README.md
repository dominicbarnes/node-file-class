## node-file-class

Object-oriented API for interacting with files in node.js

    npm install file-class

### Usage

```javascript
var File = require("file-class");

// object represents foo.txt
var file = new File("foo.txt");

// read the entire file (fs.readFile)
file.read(function (err, contents) {
    // err      => errors from fs.readFile
    // contents => contents of file
});

// Available Options
//  * encoding  -- default: "utf8"
//  * parse     -- example: JSON.parse
//  * stringify -- example: JSON.stringify
var file = new File("foo.json", {
    encoding:  "utf8"
    parse:     function (input) { /* parse and return output */ }
    stringify: function (input) { /* transform and return output */ }
});

// Short-cut File Types

// File.JSONFile (uses JSON.parse/stringify to read/write)
var json = new File.JSONFile("config.json");

// File.ListFile (converts each line of a file into an array item)
var list = new File.ListFile("white-list.txt");
```

### ChangeLog

 - **v0.0.0** Initial Release
 
### Upcoming Features

 - Complete API for files (stream, chmod, rename, etc)
