(function() {
  /**
   * What to do when someone types in either of the source code textareas
   */
    var parse = function(frame, DOMdiff) {
    // validate using slowparse
    var ret = Slowparse.HTML(document, textEditor.value);
    if(ret.error) {
      textEditor.style.background = "rgba(255,0,0,0.1)";
      return false;
    } 
    else {
      textEditor.style.background = "white";
    }

    // form DOM trees
    var latest = make("div", textEditor.value),
        oldest = make("div", textPreview.value);

    // Get diff
    DOMdiff.findDiff(oldest, latest);
    var diffs = DOMdiff.diffTracker.diffInformation;
    DOMdiff.applyDiff.applyDiff(diffs, latest);
    textPreview.value = latest.innerHTML;


    //No sure how we are supposed to do JSON serialization stuff, so we removed it for now. 
    // update iframe
    frame.update(textEditor.value, DOMdiff);
  };

  /**
   * initialise the global variables,
   * and parse handling.
   */
  function init() {
    document.removeEventListener("DOMContentLoaded", init, false);
    
    require(["DOMdiff"], function(DOMdiff){
    
      // quick find/make, and the text areas
      find = function(s) { return document.querySelector(s); },
      make = function(t,c) { var d = document.createElement(t); if(c) d.innerHTML = c; return d; },

      textEditor = find("#one"),
      textPreview = find("#two"),
      t3 = find("#three"),
      frame = new Frame(find("iframe"));

      // set frame content
      textPreview.value = textEditor.value;
      frame.set(textEditor.value);

      // bind event handling and parse
      textEditor.onkeyup = function() { 
        parse(frame, DOMdiff);
      };
    });
  }

  // kickstart on DOM ready
  document.addEventListener("DOMContentLoaded", init, false);

}());
