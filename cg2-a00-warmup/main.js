
/*
* This is main.js which is referenced directly from within
* a <script> node in index.html
*/

// "use strict" means that some strange JavaScript things are forbidden
"use strict";

// this shall be the function that generates a new path object
var makePath = function ( seperator) {
  var path="";
  if (seperator === undefined) {
    var f = function(arg) {
      if(arg ===undefined) {
        return path;
      } else {
        if(path == "") {
          path= path + arg;
        } else {
          path = path + ',' + arg;
          return path;
        }
      }
    }
    return f;
  } else {
    var f = function (arg) {
      if(arg === undefined) {
        return path;
      }  else {
        if(path == "") {
          path= path + arg;
        } else {
          path = path + seperator + arg;
          return path;
        }
      }
    }
    return f;
  }
};
// the main() function is called when the HTML document is loaded
var main = function() {

  ////////////////////////////////////////////////////////////
  //create a path, add a few points on the path, and print it
  var path1 = makePath();

  path1("A");
  path1("B");
  path1("C");

  var path2 = makePath("-->");
  path2("Berlin");
  path2("San Francisco");
  path2("Vancouver");

  window.console.log("path 1 is " + path1() );
  window.console.log("path 2 is " + path2() );

  ////////////////////////////////////////////////////////////
  // second example
  window.console.log('This is the start.');

  // sets a timeout and calls the callbackFunction
  // after the timeout.
  // The specified callback is 0!!! milliseconds
  setTimeout(function callbackFunction() {
    window.console.log('This is a msg from call back.');
  }, 0);

  window.console.log('This is just a message.');


};
