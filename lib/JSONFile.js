var util = require("util"),
    File = require("./File");

function JSONFile() {
    File.apply(this, arguments);
}

util.inherits(JSONFile, File);

JSONFile.prototype.parse = JSON.parse;
JSONFile.prototype.stringify = JSON.stringify;

module.exports = JSONFile;
