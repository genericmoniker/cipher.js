cipher.js
=========

Classic ciphers implemented in JavaScript


Where was I?

http://docs.angularjs.org/tutorial/step_02

Trying to go through the tutorial. My version isn't working. If I add
the ng-app="cipherApp", Angular doesn't appear to work at all -- no
replacements. Do I have a javascript syntax error or something?

The problem was that angular needed to be included first (before the other
javascript files). Found this by looking at the browser console.