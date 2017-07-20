$(document).ready(function(){
  // search wikipedia on click
  $("#search").on("click", function(){
    // fill in code
    console.log("button clicked"); //debug
    // call API data: https://www.mediawiki.org/wiki/API:Main_page
    // parse data; distribute into boxes
    // allow draggability: http://api.jqueryui.com/draggable/
    // inform user of draggability, clickability (popup? snackbar?)
  });
  $("#random").on("click", function(){
    // fill in code
    console.log("random button clicked"); //debug
    // call API data: https://en.wikipedia.org/wiki/Special:Random
    // use similar functions as previously defined to display data
  });
});
