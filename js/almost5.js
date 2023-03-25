const regex = /([^\[\]+()!]+)/g;

function makeNumber(num_str) {
    const match = num_str.match(/[1-9]+/);
    if (!match) {
        return num_str;
    }
    return makeNumber(num_str.replace(match[0], `++[${match[0] - 1}][0]`));
}

function jsfify(s) {
    let new_value = s + [];
    for (const conversion in conversions) {
        new_value = new_value.replaceAll(conversion, conversions[conversion])
    }

    for (const match of new_value.matchAll(regex)) {
        new_value = new_value.replace(match[0], fromString(match[0]));
    }
    return new_value;
}

function fromString(s) {
    return s.split("").map(char => {
        if (!(char in map)) {
            const charCode = char.charCodeAt(0)+[];
            return jsfify(`[[]+[]][0][constructor][fromCharCode](${charCode})`);
        }
        return map[char];
    }).join("+");
}

function compile(code) {
    return jsfify(`Function(return eval)()(${fromString(code)})`);
}


const conversions = {
    "undefined": "[[][[]]+[]][0]",
    "findStr": "[[][find]+[]][0]", //'function find() { [native code] }'
    "NaN": "[+[][[]]+[]][0]",
    "Infinity": "[+[1e1000]+[]][0]",
    "Function": "[][find][constructor]",
    "toString": "to+[[]+[]][0][constructor][name]"
}

// Characters using only +[]
const map = {};

map["0"] = "[+[]+[]][+[]]";

for (let i = 1; i < 10; i++) {
    map[`${i}`] = makeNumber(`[++[${i - 1}][0]+[]][0]`);
}


map["u"] = "undefined[0]"
map["n"] = "undefined[1]"
map["d"] = "undefined[2]"
map["e"] = "undefined[3]"
map["f"] = "undefined[4]"
map["i"] = "undefined[5]"
map["a"] = "NaN[1]"
map["c"] = "findStr[3]"
map["t"] = "findStr[4]"
map[" "] = "findStr[8]"
map["v"] = "findStr[23]"
map["o"] = "findStr[27]"

// Also using !
map["s"] = "[![]+[]][0][3]"
map["r"] = "[!+[]+[]][0][1]"

map["m"] = "[[+[]][0][constructor]+[]][0][11]"


// Also using ()
map["p"] = "[+[25]][0][toString](30)"
map["h"] = "[+[17]][0][toString](20)"
map[","] = "[[[]][concat]([]+[])+[]][0]"
map["C"] = "[Function(return escape)()(,)[2]][0]"

for (let key in map) {
    map[key] = jsfify(map[key]);
}

eval(compile("console.log('Hello, world!')"));





