export class Utils {
    static paddy(num: number, padlen: number = 2, padchar = '0') {
        var pad_char = typeof padchar !== 'undefined' ? padchar : '0';
        var pad = new Array(1 + padlen).join(pad_char);
        return (pad + num).slice(-pad.length);
    }
}