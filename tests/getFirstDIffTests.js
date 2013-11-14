require.config({ baseUrl: "../"} );

define(function (require) {

	/**
	 * Creates a DOM element with inner HTML.
	 */
	function make(tag, content) {
		var e = document.createElement(tag);
		e.innerHTML = content;
		return e;
	}

	var getFirstDiff = require("getFirstDiff");
	var utils = require("Utils");
	var markSubtrees = require("markSubTrees");

	QUnit.module("getFirstDiff tests");

	/**
	 * 
	 */
	QUnit.test("", function() {
		var t1, t2, firstDiff, gapInfo, subset;

		t1 = make("div", "<div>Hello</div>");
		t2 = make("div", "<div>Goodbye</div>");

		subset = markSubtrees(t1, t2);
		gapInfo = utils.getGapInformation(t1, t2, subset);
		firstDiff = getFirstDiff(t1, t2, gapInfo);
		console.log(firstDiff);

		ok(1 === 1, "f");
	});

});