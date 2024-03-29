// 比较完整的模拟sprintf函数功能。可用的格式化通配符：

// 　　%% - 返回百分号本身
// 　　%b - 二进制数字
// 　　%c - ASCII对应的字符
// 　　%d - 整数
// 　　%f - 浮点数
// 　　%o - 八进制数字
// 　　%s - 字符串
// 　　%x - 16进制数字 (小写字母形式)
// 　　%X - 16进制数字 (大写字母形式)
// 　　在 % 号和通配字符之间可用的选项包括 (比如 %.2f)：
// 　　+　　　(强制在数字前面显示 + 和 - 符号作为正负数标记。缺省情况下只有负数才显示 - 符号)
// 　　-　　　(变量左对齐)
// 　　0　　　(使用0作为右对齐的填充字符)
// 　　[0-9]　(设置变量的最小宽度)
// 　　.[0-9] (设置浮点数精度或字符串的长度)

/**
*
* Javascript sprintf
* http://www.webtoolkit.info/
*
*
**/
/**
*
*  Javascript sprintf
*  http://www.webtoolkit.info/
*
*
**/
sprintfWrapper = {

    init: function () {

        if (typeof arguments == "undefined") { return null; }
        if (arguments.length < 1) { return null; }
        if (typeof arguments[0] != "string") { return null; }
        if (typeof RegExp == "undefined") { return null; }

        var string = arguments[0];
        var exp = new RegExp(/(%([%]|(\-)?(\+|\x20)?(0)?(\d+)?(\.(\d)?)?([bcdfosxX])))/g);
        var matches = new Array();
        var strings = new Array();
        var convCount = 0;
        var stringPosStart = 0;
        var stringPosEnd = 0;
        var matchPosEnd = 0;
        var newString = '';
        var match = null;

        while (match = exp.exec(string)) {
            if (match[9]) { convCount += 1; }

            stringPosStart = matchPosEnd;
            stringPosEnd = exp.lastIndex - match[0].length;
            strings[strings.length] = string.substring(stringPosStart, stringPosEnd);

            matchPosEnd = exp.lastIndex;
            matches[matches.length] = {
                match: match[0],
                left: match[3] ? true : false,
                sign: match[4] || '',
                pad: match[5] || ' ',
                min: match[6] || 0,
                precision: match[8],
                code: match[9] || '%',
                negative: parseInt(arguments[convCount]) < 0 ? true : false,
                argument: String(arguments[convCount])
            };
        }
        strings[strings.length] = string.substring(matchPosEnd);

        if (matches.length == 0) { return string; }
        if ((arguments.length - 1) < convCount) { return null; }

        var code = null;
        var match = null;
        var i = null;

        for (i = 0; i < matches.length; i++) {

            if (matches[i].code == '%') { substitution = '%' }
            else if (matches[i].code == 'b') {
                matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(2));
                substitution = sprintfWrapper.convert(matches[i], true);
            }
            else if (matches[i].code == 'c') {
                matches[i].argument = String(String.fromCharCode(parseInt(Math.abs(parseInt(matches[i].argument)))));
                substitution = sprintfWrapper.convert(matches[i], true);
            }
            else if (matches[i].code == 'd') {
                matches[i].argument = String(Math.abs(parseInt(matches[i].argument)));
                substitution = sprintfWrapper.convert(matches[i]);
            }
            else if (matches[i].code == 'f') {
                matches[i].argument = String(Math.abs(parseFloat(matches[i].argument)).toFixed(matches[i].precision ? matches[i].precision : 6));
                substitution = sprintfWrapper.convert(matches[i]);
            }
            else if (matches[i].code == 'o') {
                matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(8));
                substitution = sprintfWrapper.convert(matches[i]);
            }
            else if (matches[i].code == 's') {
                matches[i].argument = matches[i].argument.substring(0, matches[i].precision ? matches[i].precision : matches[i].argument.length)
                substitution = sprintfWrapper.convert(matches[i], true);
            }
            else if (matches[i].code == 'x') {
                matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(16));
                substitution = sprintfWrapper.convert(matches[i]);
            }
            else if (matches[i].code == 'X') {
                matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(16));
                substitution = sprintfWrapper.convert(matches[i]).toUpperCase();
            }
            else {
                substitution = matches[i].match;
            }

            newString += strings[i];
            newString += substitution;

        }
        newString += strings[i];

        return newString;
    },

    convert: function (match, nosign) {
        if (nosign) {
            match.sign = '';
        } else {
            match.sign = match.negative ? '-' : match.sign;
        }
        var l = match.min - match.argument.length + 1 - match.sign.length;
        var pad = new Array(l < 0 ? 0 : l).join(match.pad);
        if (!match.left) {
            if (match.pad == "0" || nosign) {
                return match.sign + pad + match.argument;
            } else {
                return pad + match.sign + match.argument;
            }
        } else {
            if (match.pad == "0" || nosign) {
                return match.sign + match.argument + pad.replace(/0/g, ' ');
            } else {
                return match.sign + match.argument + pad;
            }
        }
    },

    sprintf: function () {
        var str = arguments[0].replace(/\n/g, "<br>")
        return sprintfWrapper.init(str, arguments[1])
    },

    printf: function () {
        if (arguments.length <= 0) {
            return
        }
        var str = arguments[0].replace(/\n/g, "<br>")
        var str2 = sprintfWrapper.init(str, arguments[1])
        document.write(str2)
    },

    print: function () {
        var res = ""
        if (arguments) {
            for (var i = 0; i < arguments.length; i++) {
                res += arguments[i].toString().replace(/\n/g, "<br>")
            }
        }
        document.write(res)
    },

    println: function () {
        var res = ""
        if (arguments) {
            for (var i = 0; i < arguments.length; i++) {
                res += arguments[i].toString().replace(/\n/g, "<br>")
            }
        }
        res += "<br/>"
        document.write(res)
    }
}

// 直接打印 html
sprintf = sprintfWrapper.sprintf;
printf = sprintfWrapper.printf;
print = sprintfWrapper.print;
println = sprintfWrapper.println;

console.sprintf = sprintfWrapper.init;
console.printf = function () {
    var str = sprintfWrapper.init.apply(this, Array.prototype.slice.call(arguments, 0));
    console.log(str);
};
console.println = console.log
