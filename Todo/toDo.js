var ans = prompt("What would you like to do");
var list = [];

if(ans === "list") {
    console.log(list);
}
else if(ans === "new") {
    var val = prompt();
    list.push(val);
}

if(ans === "list") {
    console.log(list);
}