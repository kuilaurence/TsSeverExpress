"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertValue = void 0;
var url_1 = __importDefault(require("url"));
var mysql_1 = __importDefault(require("mysql"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var connection = mysql_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mysql',
});
connection.connect();
var app = (0, express_1.default)();
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //*表示可以跨域任何域名都行 也可以填域名表示只接受某个域名
    res.header("Access-Control-Allow-Credentials", "true"); //允许跨域验证
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type'); //可以支持的消息首部列表
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS'); //可以支持的提交方式
    res.header('Content-Type', 'application/json;charset=utf-8'); //请求头中定义的类型
    next();
});
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
var server = app.listen(8080, function () {
    console.log("就绪:", JSON.stringify(server.address()));
});
app.get('/help', function (req, res) {
    console.log("-----url------", req.url);
    res.status(200);
    var parseObj = url_1.default.parse(req.url, true);
    var queryObj = parseObj.query;
    var sql = 'SELECT * FROM student WHERE name = ?';
    connection.query(sql, [queryObj.name], function (error, results, fields) {
        if (error)
            throw error;
        var resJson = {
            code: 200,
            status: "success",
            count: results.length,
            data: results
        };
        res.json(resJson);
    });
});
/**
 * 插入一行数据
 */
function insertValue() {
    connection.query("INSERT INTO student(name,age)\n        VALUES ('hello',22)", function (error, results, fields) {
        if (error)
            throw error;
    });
}
exports.insertValue = insertValue;
// connection.end();
