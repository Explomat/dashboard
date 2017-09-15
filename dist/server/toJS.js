function xmlElemToJS(arr){
    var obj = {};
    for (ch in arr){
        obj[ch.Name] = RValue(ch);
    }
    return obj;
}
