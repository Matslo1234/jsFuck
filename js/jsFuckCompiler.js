const zero = "+[]";
const one = "!+![]";

function number (n) {
    if(n === 0) { return zero; }
    if(n === 1) { return "+!![]"; }
    return Array.from({length: n}, () => one).join("+");
};


var map = {};

function fromString (s) {
    return s.split("").map(char => {
        if(!(char in map)) {
            const charCode = char.charCodeAt(0)+[];
            return `([]+[])[${fromString("constructor")}][${fromString("fromCharCode")}](${fromString(charCode)})`;
        }
        return map[char];
    }).join("+");
};

/*
    +[![]]+[] = "NaN"
    ([][0]+[]) = "undefined"
    (!![]+[]) = "true"
    (![]+[]) = "false"
    (([]+[])["constructor"]+[]) = "function String() { [native code] }"
    ((+!![])["constructor"]+[]) = "function Number() { [native code] }"
    ([]["filter"]+[])  = "function filter() { [native code] }" 
    ([]["filter"]["constructor"] - function constructor. Can pass it any code to execute it.
*/

map["0"] = "(+[]+[])";
map["1"] = "(+!![]+[])";
for(var i = 2; i <= 9; i++) {
    map[`${i}`] = `(${Array.from({length: i}, () => one).join("+")}+[])`;
}

/*needed for filter*/
map.f = `(![]+[])[${number(0)}]`;
map.i = `([][${number(0)}]+[])[${number(5)}]`;
map.l = `(![]+[])[${number(2)}]`;


/*all letters needed for "constructor"*/
map.e = `(!![]+[])[${number(3)}]`;
map.a = `(+[![]]+[])[${number(1)}]`;
map.n = `([][${number(0)}]+[])[${number(1)}]`;
map.s = `(![]+[])[${number(3)}]`;
map.t = `(!![]+[])[${number(0)}]`;
map.r = `(!![]+[])[${number(1)}]`;
map.u = `([][${number(0)}]+[])[${number(0)}]`;
map.o = `([][${fromString("filter")}]+[])[${number(6)}]`;
map.c = `([][${fromString("filter")}]+[])[${number(3)}]`;


map.d = `([][${number(0)}]+[])[${number(2)}]`;
map.i = `([][${number(0)}]+[])[${number(5)}]`;
map.m = `((+!![])[${fromString("constructor")}]+[])[${fromString("11")}]`;
map.S = `(([]+[])[${fromString("constructor")}]+[])[${number(9)}]`;
map.g = `(([]+[])[${fromString("constructor")}]+[])[${fromString("14")}]`;
map.p = `(${number(25)})[${fromString("toString")}](${fromString("26")})`; 
map.h = `(${number(17)})[${fromString("toString")}](${fromString("18")})`; 
map[" "] = `([][${fromString("filter")}]+[])[${number(8)}]`;
map["["] = `([][${fromString("filter")}]+[])[${fromString("20")}]`;
map["]"] = `([][${fromString("filter")}]+[])[${fromString("32")}]`;
map["%"] = `([][${fromString("filter")}][${fromString("constructor")}](${fromString("return escape")})()(${map["["]})+[])[${number(0)}]`;
map["\\"] = `([][${fromString("filter")}][${fromString("constructor")}](${fromString("return unescape")})()(${fromString("%5c")})+[])[${number(0)}]`;
map.C = `([][${fromString("filter")}][${fromString("constructor")}](${fromString("return escape")})()(([]+[])[${fromString("italics")}]()))[${number(2)}]`;
map["("] = `([][${fromString("filter")}]+[])[${fromString("15")}]`;
map[")"] = `([][${fromString("filter")}]+[])[${fromString("16")}]`;
map.v = `([][${fromString("filter")}]+[])[${fromString("25")}]`;



function compile(code){return `[][${fromString("filter")}][${fromString("constructor")}]([${fromString("return eval")}])()((${fromString(code)})+[])`;}