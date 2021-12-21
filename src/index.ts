import url from 'url';
import mysql from 'mysql';
import express from 'express';
import bodyParser from 'body-parser';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'gg',
});

connection.connect();
const app = express();

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');//*表示可以跨域任何域名都行 也可以填域名表示只接受某个域名
    res.header("Access-Control-Allow-Credentials", "true");//允许跨域验证
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');//可以支持的消息首部列表
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');//可以支持的提交方式
    res.header('Content-Type', 'application/json;charset=utf-8');//请求头中定义的类型
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const server = app.listen(8080, () => {
    console.log("就绪:", JSON.stringify(server.address()));
})
//http://192.168.3.216:8080/help?age=21
app.get('/help', function (req, res) {
    console.log("-----url------", req.url);
    res.status(200);
    var parseObj = url.parse(req.url, true);
    var queryObj = parseObj.query;
    var sql = 'SELECT * FROM student WHERE  age = ?';
    connection.query(sql, [queryObj.age], function (error, results, fields) {
        if (error) throw error;
        var resJson = {
            code: 200,
            status: "success",
            count: results.length,
            data: results
        }
        res.json(resJson);
    });
});

/**
 * 插入一行数据
 */
export function insertValue() {
    connection.query(
        `INSERT INTO student(name,age)
        VALUES ('hello',22)`,
        function (error, results, fields) {
            if (error) throw error;
        });
}

// connection.end();