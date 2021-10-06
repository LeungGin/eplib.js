/**
 * 解析逻辑中缀表达式
 * 
 * @param {String} expression 逻辑中缀表达式
 * @param {Object} data 表达式中变量的取值数据源
 * @returns 表达式执行结果
 */
function parseExpression(expression, data) {
    if (expression == undefined) {
        return undefined;
    }
    if (data != undefined) {
        expression = replaceParam(expression, data);
    }
    return new Function("return " + expression)();
}

/**
 * 替换表达式中的变量，默认变量格式：{xxx}
 * 
 * @param {String} expression 逻辑中缀表达式
 * @param {Object} data 表达式中变量的取值数据源
 * @returns 替换变量后的表达式字符串，如果表达式变量在data中不存在，会被替换为undefined
 */
function replaceParam(expression, data) {
    let params = expression.match(/\{(.+?)\}/g);
    if (params != undefined && params instanceof Array) {
        for (const p of params) {
            let replaceValue = data[p.substring(1, p.length - 1)];
            expression = expression.replace(new RegExp(p, 'g'), formatStandardGrammar(replaceValue));
        }
    }
    return expression;
}

/**
 * 按js标准语法格式化为源码写法
 * 
 * @param {Object} value 传入值
 * @returns 格式化后的源码写法
 */
function formatStandardGrammar(value) {
    if (typeof value == "string") {
        return "'" + value + "'";
    }
    if (typeof value == "date") {
        return "new Date('" + value.toUTCString() + "')";
    }
    return value;
}
