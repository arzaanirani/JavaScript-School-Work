/*
Examples shows exporting and replacement of the whole exports 
object using "module.exports =" instead of just exports.

Reminder:
exports.a = b; //adds a property "a" to the default exports object 
whereas 
module.exports = a; 
replaces the default exports object with a.

A note about exports vs module.exports:
module.exports refers to the object that will be exported by the module.
exports refers to the object the by default will be exported.
That is, by default module.exports = exports.
That means you can either add properties to the exports object
e.g. exports.a = foo;
or you can re-assign the object that will be exported
e.g. module.exports = {a: function(){...});

The problem is that if you reassign module.exports, the exports
variable still points to the old default object. It is a common
bug to refer to the old exports objects through the exports variable
even though module.exports has been reassigned.


*/
//Function meant to be used as a constructor
//This code is simulating the idea of a class from OO languages
//Notice convention of naming it starting with a capital letter
//Review notes 02 "Javascript Objects and Prototypes regarding the meaning of "this".

var Calculator = function(aPercentage, aPercentageTip){ 
   this.taxRate = aPercentage;
   this.tipRate = aPercentageTip;
}

Calculator.prototype.calcTip = 
    function(amount) {return amount*(this.tipRate)/100;}
Calculator.prototype.calcTax = 
   function(amount) {return amount*(this.taxRate)/100;}
Calculator.prototype.calcTotal = 
   function(amount) {return amount + this.calcTax(amount) + this.calcTip(amount);}

//overwrite default exports object.
//That is, reassign the object that will be exported.
module.exports = Calculator;



