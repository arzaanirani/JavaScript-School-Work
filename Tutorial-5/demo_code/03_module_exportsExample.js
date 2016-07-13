/*
    In the mod1 example, the module1.js adds the variable a to the exports object,
    then adds b to the exports object (two different ways to do this). 
    Therefore, mod1.a prints the exported value of a in the module1.js code
    and mod2.b prints the exported value of b in the module2.js code.

    In the mod2 example the exports object is referring to the old exports variable,
    so when b is assigned it is not assigned to the new variable. So, when it is printed
    using mod2 here, the variable b is created and therefore undefined.
*/

var mod1 = require("./module1.js");
var mod2 = require("./module2.js");


console.log(mod1.a + ", " + mod1.b);
console.log(mod2.a + ", " + mod2.b);
