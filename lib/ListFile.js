var util = require("util"),
    File = require("./File");

function ListFile() {
    File.apply(this, arguments);
}

util.inherits(ListFile, File);

ListFile.prototype.parse = function (input) {
    return input.trim().split(/[\r\n]+/gm);
};

ListFile.prototype.stringify = function (input) {
    return input.join("\n");
};

module.exports = ListFile;
