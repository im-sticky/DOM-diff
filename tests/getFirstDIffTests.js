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
	 * Tests whether the function only finds the first DOM tree difference or not.
	 */
	QUnit.test("getFirstDiff for multi difference DOM tree", function() {
		var t1, t2, firstDiff, gapInfo, subset;

		t1 = make("div", "<div>Hello</div>");
		t2 = make("div", "<div>Goodbye</div>");

		subset = markSubtrees(t1, t2);
		gapInfo = utils.getGapInformation(t1, t2, subset);
		firstDiff = getFirstDiff(t1, t2, gapInfo);

		ok(firstDiff.action === "replace", "text has been replaced");
		ok(firstDiff.newValue === "Goodbye", "new value is 'Goodbye'");

		t1 = make("div", "<div><p>The first paragraph</p><p>The second paragraph</p></div>");
		t2 = make("div", "<div><p>The first paragraph</p><p>This paragraph is different<p>The third paragraph</p></div>");

		subset = markSubtrees(t1, t2);
		gapInfo = utils.getGapInformation(t1, t2, subset);
		firstDiff = getFirstDiff(t1, t2, gapInfo);
		
		ok (firstDiff.action === "replace", "the first difference's text has been replaced")
		
		t2 = make("div", "<div><div>The first paragraph</div><p>This should not be shown</p></div>");
		
		/****** FOR SOME REASONE RETURNING NO DIFFERENCE ******/
		subset = markSubtrees(t1, t2);
		gapInfo = utils.getGapInformation(t1, t2, subset);
		firstDiff = getFirstDiff(t1, t2, gapInfo);
		//console.log(firstDiff);

		t2 = make("div", "<p>Test 1</p><p>Test 2</p>");

		/**** NOT SHOWING THE DIFFERENCE AS THE DIV BEING REMOVED??? *****/
		subset = markSubtrees(t1, t2);
		gapInfo = utils.getGapInformation(t1, t2, subset);
		firstDiff = getFirstDiff(t1, t2, gapInfo);
		//console.log(firstDiff);


	});

});