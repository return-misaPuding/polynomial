factorize = num =>
    [...Array(num).keys()]
    .map(i => i + 1)
    .reduce((acc, inc) =>
      num % inc === 0 ?
      [...acc, inc] : acc
    , []) //stackoverflow W
function getNum(str, pos) {
    retnum = 0;
    while (/\d/.test(str[pos]) && pos < str.length) {
        retnum = retnum*10+str[pos];
        pos++;
    }
    return retnum;
} // gets number starting at pos out of a string
function parseNum(pnum) {
    factors = factorize(pnum);
    factors.shift(); //remove 1 as the factor
    sq = Math.sqrt(pnum);
    parse = [];
    for (let i=0; i < factors.length; i++) {
        if (factors[i] < sq) {
            parse.push(factors[i]);
        } else {continue};
    };
    return parse;
} //remove factors above sqrt of number
function parseMono(pmono) {
    let i=0;
    retMono = []
    while (i < pmono.length) {
        if (/\d/.test(pmono[i])) {
            let num = getNum(pmono, i);
            retMono = retMono.concat(parseNum(num)); //reduce integer to factors, add factors to results
            i += num.toString().length; //skip returned number
        } else {
            if (pmono[i+1] == "^") {
                for (j=0; j <= pmono[i+2]; j++) {retMono.push(pmono[i])};
                i += 3; // move iteration past exponent
            } else {retMono.push(pmono[i]); i++};
        }
    }
    return retMono;
}
function reduceMono(mono) {
num = mono.split("/")[0];
den = mono.split("/")[1];

}