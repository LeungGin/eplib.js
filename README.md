# eplib.js
逻辑中缀表达式解析库
Expression Parse Library


## 开始使用 \- Getting started
```javascript
let result = parseExpression("{param1} > 1 || {param2} == 2", {
    "param1": 1,
    "param2": 2,
});
# result = true
```