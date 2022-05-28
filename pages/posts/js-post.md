---
title: express的post跨域问题和前端原生js的post实现
date: 2020-06-06 19:16:00
tags: ["基础功能","编程","代码留档"]
categories: ["编程","基础功能"]
---

## 写在前面

这个系列只是用于记录自己过去写过的代码，避免自己重复做无用功

### 这个是什么

这是post的js实现

<!-- more -->

## 贴出代码

后端js

```javascript
var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json())
//  跨域部分
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.get('/', function (req, res) {
  console.log('主页 GET 请求 危险连接')
  console.log(req.body)
  res.send('危险连接')
})

//  POST 请求
app.post('/', function (req, res) {
  console.log('主页 POST 请求')
  console.log(req.body)
  res.send('Hello POST')
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('测试服务器已启动，运行在', host, port)
})

```

前端js

```javascript
     xmlHttp = new XMLHttpRequest()
      var array = [{ id: 'hello', hello: 'value' }]
      xmlHttp.open('post', 'http://127.0.0.1:8081')
      var ele_csrf = document.getElementsByName('csrfmiddlewaretoken')[0]
      xmlHttp.setRequestHeader('Content-Type', 'application/json')
      xmlHttp.send(JSON.stringify(array))
      xmlHttp.onreadystatechange = function () {
        if (this.status == 200) {
          console.log('返回数据为', this.responseText)
          console.log('返回数据为', JSON.parse(his.responseText))
        }
      }
```



## 结果展示

这个没啥好展示的，毕竟是后端功能

