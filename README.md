# node-file-class

Object-oriented API for interacting with files in node.js

    npm install file-class

Include in your project, the export is a single constructor function

    var File = require("file-class");

## Usage

### File(location, [options]) <small>constructor</small>

The constructor will create an object representing a file on disk.

**Arguments**

 * location - The location/path to file on disk (absolute is likely preferred)
 * options - A hash of additional properties for the object (just extended to this)
    * encoding - The encoding for the file (default: `"utf8"`)
    * parse - A function to parse a file body (default: `null`)
    * stringify - A function to encode data into a file body (default: `null`)

```javascript
var file = new File("foo.txt");

// or

var file = new File("foo.conf", {
    encoding:  "utf8",
    parse:     function (input) { /* parse and return output */ },
    stringify: function (input) { /* transform and return output */ }
});

// or even

var file = new File("my-file");

file.encoding = "binary"; // can set properties after initialization
```

### File#read(callback)

Read the entire contents of the file (via `fs.readFile()`) and return in a callback.

**Arguments**

 * callback - Arguments provided:
    * err - Error object (if relevent)
    * contents - The entire contents of the file

```javascript
file.read(function (err, contents) {
    // err => null or Error()
    // contents => string of contents (or buffer in encoding is not utf8)
});
```

### File#mkdir(callback)

Create the entire directory tree for this file (via [`mkdirp`](https://npmjs.org/package/mkdirp))

**Arguments**

 * callback - Arguments provided:
    * err - Error object (if relevent)

```javascript
file.mkdir(function (err) {
    // err => null or Error()
});
```

### File#write(contents, callback)

Write `contents` to the file (via `fs.writeFile()`)

**Arguments**

 * contents - The data to be written to the file
 * callback - Arguments provided:
    * err - Error object (if relevent)

```javascript
file.write("FOO", function (err) {
    // err => null or Error()
});
```

### File#empty(callback)

Clear the contents of the file (ie. `file.write(`""`, ...)`)

**Arguments**

 * callback - Arguments provided:
    * err - Error object (if relevent)

```javascript
file.empty(function (err) {
    // err => null or Error()
});
```

### File#unlink(callback) <small>*Alias*: del</small>

Delete the file from the filesystem (via `fs.unlink(...)`).

**Arguments**

 * callback - Arguments provided:
    * err - Error object (if relevent)

```javascript
file.unlink(function (err) {
    // err => null or Error()
});
```

### File#exists(callback)

Check for this file's existence (via `fs.exists(...)`).

**Arguments**

 * callback - Arguments provided:
    * exists - `true`/`false`

```javascript
file.exists(function (exists) {
    // exists => true/false
});
```

### File#stat(callback)

Get a `fs.Stats` object for the file (via `fs.stat(...)`).

**Arguments**

 * callback - Arguments provided:
    * err - Error object (if relevent)
    * stats - fs.Stats object

```javascript
file.stat(function (err, stats) {
    // err => null or Error()
    // stats => fs.Stats object
});
```

<hr>

### File.JSONFile(location, [options]) <small>constructor</small>

The constructor will create an object representing a JSON file on disk. This object exposes helper methods for dealing with JSON.

**Arguments**

 * location - same as `File`
 * options - same as `File`, with some additions:
    * replacer - A replacer function: see [JSON.stringify](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/JSON/stringify) (default: `null`)
    * spaces - Number of spaces to use in output: see [JSON.stringify](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/JSON/stringify) (default: `null`)

```javascript
var json = new File.JSONFile("package.json");

json.read(function (err, json) {
   // json => parsed JSON object for file
});
```

### File.JSONFile#merge(data, callback)

Reads the file, uses [`extend`](https://npmjs.org/package/extend) to merge the data in before writing.

**Arguments**

 * data - The object of data to merge
 * callback - Arguments provided:
    * err - Error object (if relevent)
    * contents - The contents as they were written

```javascript
json.merge({ foo: "bar" }, function (err, contents) {
    // err => null or Error()
    // contents => final state of file contents
});
```

<hr>

### File.ListFile(location, [options]) <small>constructor</small>

The constructor will create an object representing a file on disk whose contents are comprised of one item per-line. This object exposes helper methods for dealing with that collection.

**Arguments**

 * location - same as `File`
 * options - same as `File`

```javascript
var list = new File.ListFile("banned.txt");

list.read(function (err, users) {
   // users => array of users (one per line of file)
});
```

### File.ListFile#indexOf(item, callback)

Determine the index of the item specified in the collection.

**Arguments**

 * item - The item to check
 * callback - Arguments provided:
    * err - Error object (if relevent)
    * index - The 0-indexed line number for that item (-1 if not found)
    * list - The complete list (via `this.read(...)`)

```javascript
list.indexOf("hello world", function (err, index, list) {
    // err => null or Error()
    // index => -1 or index in array
    // list => the list that was read from disk
});
```

### File.ListFile#contains(item, callback)

Determine whether or not an item is in the collection at all.

**Arguments**

 * item - The item to check
 * callback - Arguments provided:
    * err - Error object (if relevent)
    * contains - `true`/`false`
    * list - The complete list (via `this.read(...)`)

```javascript
list.contains("hello world", function (err, contains, list) {
    // err => null or Error()
    // contains => -1 or index in array
    // list => the list that was read from disk
});
```

### File.ListFile#add(item, callback)

Add a new item to the collection.

**Arguments**

 * item - The item to add
 * callback - Arguments provided:
    * err - Error object (if relevent)

```javascript
list.add("hello world", function (err) {
    // err => null or Error()
});
```

### File.ListFile#remove(item, callback)

Remove an item from the collection. (either by value, or index)

**Notice:** this will only remove the first occurence, even if the value occurs multiple times in the file.

**Arguments**

 * item - The item to remove (`Number`: will remove that line via index. `String`: will call `this.indexOf()` to determine which line to remove)
 * callback - Arguments provided:
    * err - Error object (if relevent)

```javascript
list.add("hello world", function (err) {
    // err => null or Error()
});
```

<hr>

## ChangeLog

 - **v0.1.0** Updating API documentation, adding JSONFile and ListFile special methods and options
 - **v0.0.1** Initial Release

## Upcoming Features

 - Complete API for files (stream, chmod, rename, etc)
 - Additional File Types (YAML, ini, etc)
 - Use lodash/underscore.js for ListFile collections?
