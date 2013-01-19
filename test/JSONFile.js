var path = require("path"),
    File = require("../");

describe("JSONFile()", function () {
    var file = new File.JSONFile(path.join(__dirname, "tmp/test.json"));

    it("should have JSON.parse set as the parse property/method", function () {
        file.parse.should.equal(JSON.parse);
    });

    it("should have JSON.stringify set as the stringify property/method", function () {
        file.stringify.should.equal(JSON.stringify);
    });
});
