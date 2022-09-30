
const objectPrintFormatter = (toPrint) => {

    if(toPrint instanceof Set || toPrint instanceof Map) {
        return JSON.stringify(Array.from(toPrint));
    }
    else if(toPrint instanceof Object) {
        return JSON.stringify(toPrint);
    }
    return toPrint;
} 

const array = ['sun', 'sea', 'surf'];
const set = new Set(['sun', 'sea', 'surf']);
const map = new Map([[1, 'sun'], [2, 'sea'], [3, 'surf']]);
const object = { sun: 1, sea: 2, surf: 3 };

console.log(`array ${objectPrintFormatter(array)}`);
console.log(`set ${objectPrintFormatter(set)}`);
console.log(`map ${objectPrintFormatter(map)}`);
console.log(`object ${objectPrintFormatter(object)}`);




