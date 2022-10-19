var compiled = "";
const outputLengthLimit = 1000000;

window.onload = function() {
    document.getElementById("loading").hidden = true;
    document.getElementById("mainArea").hidden = false;
    compileInput();
}

function compileInput() {
    const input = document.getElementById("jsInput");
    const inText = input.value;
    compiled = compile(inText);
    const error = document.getElementById("error");
    error.hidden = true;
    if(compiled.length > outputLengthLimit) {
        document.getElementById("jsOutput").value = compiled.substring(0, outputLengthLimit);
        error.hidden = false;
    }
    else {
        document.getElementById("jsOutput").value = compiled;
    }
    document.getElementById("outputSize").innerHTML = formatBytes(compiled.length, 2);
}

function execute() {
    eval(compiled);
}

function copyToClipboard() {
    navigator.clipboard.writeText(compiled);
}

function formatBytes(bytes, decimals) {
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}