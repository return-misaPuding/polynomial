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
                let num = getNum(pmono, i+2);
                for (j=0; j <= num; j++) {retMono.push(pmono[i])};
                i += num.toString().length+2; // move iteration past exponent
            } else {retMono.push(pmono[i]); i++};
        }
    }
    return retMono;
}
function reduceFraction(fraction) {
if (!fraction.includes("/")) {return fraction;};
numer = parseMono(fraction.split("/")[0]);
den = parseMono(mono.split("/")[1]);
for (i=0; i < den.length; i++) {
    let ind = numer.indexOf(den[i]);
    if (ind != -1) {numer.splice(ind,1); den.splice(i,1)};
}
return {fnumer: numer, fden: den};
}
function fillUnknown(term, defs) {
    for (i=0; i<term.length; i++) {
        if (defs[term[i]]) {
            term[i] = defs[term[i]];
        } else {term.splice(i,1)}; //replace undefined vars with values, destroy if no value given
    };
}
function compute(frac, defs) {
    let cnumerfactors = fillUnknown(frac["fnumer"], defs);
    let cdenfactors = fillUnknown(frac["fden"], defs);
    let cnumer = 1;
    let cden = 1;
    for (i=0; i < cnumerfactors.length; i++) {cnumer = cnumer*cnumerfactors[i]};
    for (i=0; i < cdenfactors.length; i++) {cden = cden*cdenfactors[i]};
    return cnumer/cden;
}