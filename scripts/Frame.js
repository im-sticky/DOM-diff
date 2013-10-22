/**
 * iframe mirroring object. This lets us
 * keep a persistent reference to its content.
 */
(function(){

  function snapshot(list) {
    return Array.prototype.slice.call(list);
  }

  /**
   * Constructor: bind the iframe's
   * window, document, head and body.
   */
  var Frame = function(iframe) {
    this.window = iframe.contentWindow;
    this.document = iframe.contentDocument;
    this.head = this.document.head;
    this.body = this.document.body;
  }

  /**
   * Prototype function definitions.
   */
  Frame.prototype = {

    /**
     * Override the DOM content with new content.
     */
    set: function(source) {
      this.body.innerHTML = source;
    },

    /**
     * send new content
     */
    update: function(source, DOMdiff) {
      var d1 = make("body"),
          d2 = this.body;
      d1.innerHTML = source;
      DOMdiff.findDiff(d2, d1);
      var diffs = DOMdiff.diffTracker.diffInformation;
      DOMdiff.applyDiff.applyDiff(diffs, d2);
    }
  };

  // bind as a window-level thing
  window.Frame = Frame;
}());