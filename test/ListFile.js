var path     = require("path"),
    ListFile = require("../").ListFile;

describe("ListFile()", function () {
    var file = new ListFile(path.join(__dirname, "tmp/test.json"));

    describe(".prototype", function () {
        describe(".parse()", function () {
            it("should turn each line into an array item", function () {
                file.parse("a\nb").should.eql([ "a", "b" ]);
            });
        });

        describe(".stringify()", function () {
            it("should turn each item of an array into separate lines", function () {
                file.stringify([ "a", "b" ]).should.equal("a\nb");
            });
        });
    });
});
