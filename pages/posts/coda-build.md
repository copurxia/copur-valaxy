---
title: 从零开始制作一个音乐播放器
tags:
  - 分享
  - 编程
author: 乐得自在
date: 2020-11-14 18:20:37
updated: 2020-11-14 18:20:37
---

## 起因
关于为啥要做这个音乐播放器。这有好多原因，最重要的自然是因为想听歌，但是网易官方的客户端在播放的时候用着不顺手，另外，感觉官方的客户端功能对我来说实在太多功能了，许多功能我实际上是用不到的，于是想动手开始写一个合自己心意的播放器。其次[@xinda](https://xinda233.top/)的inn项目给了我很多启发，因此动笔开工。

<!-- more -->

### 为啥百度轻咕了？

步入高三，很多时候的都身不由己，因此这个项目恐怕之后也无法持续更新。

## 准备

思考再三，暂时也没有什么时间学习新东西，于是决定使用自己暂时最顺手的[electron](https://electronjs.org)加上推荐给[@xinda233](https://xinda233.top/)用的[NeteaseCloudMusicApi](https://binaryify.github.io/NeteaseCloudMusicApi/)，参考[Ant Design](https://ant.design/docs/spec/introduce-cn)为设计标准，差不多也万事俱备了

配色系统： [Muzli Colors](https://colors.muz.li/)
API： [NeteaseCloudMusicApi](https://binaryify.github.io/NeteaseCloudMusicApi/)
UI库： [electron](https://electronjs.org)
语言： [NodeJS](https://nodejs.org/)

## 环境搭建

1. 首先安装[nodejs](https://nodejs.org/)环境，毕竟不是第一次使用node，这个早早准备好了。
2. 接着安装electron，因为我还不会使用electron-builder，而且为了减少项目文件夹体积，选择全局安装 `npm install electron -g` 
3. 执行` md codemusic ; cd codemusic ; npm init`新建开发项目（现在在Windows环境下）

![1.png](https://img13.360buyimg.com/ddimg/jfs/t1/135134/33/16034/66546/5fafc33eEbadef6c8/9331f90a7ba20fb8.png)

4. 新建完`index.js`和`index.html`界面如图所示

![1.png](https://img13.360buyimg.com/ddimg/jfs/t1/141925/5/14574/147088/5fafc755E5fd8c778/9dacdce40a1463eb.png)

5. 到此，一个基本的electron开发环境准备完成
6. 另外，记得把`powershell`设置为`utf-8`参考[https://www.zhihu.com/question/54724102](https://www.zhihu.com/question/54724102)

## 正式开始

### 做好一个窗体

首先我需要明确自己需要什么，根据已有的设计，界面主要部分是一个圆形窗体加上环绕窗体的环状进度条

因此，我不需要菜单栏，窗体框架，而且这必须是个不可聚焦且不可改变大小的置顶窗口

因此我设置如下属性

```json
    focusable: false,
    alwaysOnTop: true,
    frame:false,
    transparent: true, 
	resizable: false
```

让我们来试着运行……

神奇的事情发生了，什么都没有，因为我们的窗体内部还没有绘制任何东西，所以马上开始运行自然只是坑自己

因为运行时出现了滚动条，所以我们使用css移除它

```css
body {
  overflow-x: hidden;
  overflow-y: hidden;
  -webkit-app-region: drag;
}
```

### 环形进度条

进度条这东西也不是第一次做，详细可以参考我[之前的文章](https://copur.xyz/post/progressbar/)

但是直线进度条变为环形似乎导致了大脑宕机，毕竟我的css知识极其薄弱

于是一翻收藏夹，找回Ant Design里的进度条，又去掘金找了篇文章[《css3 制作圆环进度条》](https://juejin.im/post/6844903556164616205),以及简书的[《利用 clip-path 实现环形进度条》](https://www.jianshu.com/p/bc94380c4a22)，比较过后决定还是使用svg方案。毕竟使用环境为electron，而css实现又过于麻烦，尽管之前有做过[css大圆旋转](https://copur.xyz/englisten/)，但也正是因为以前做过，所以再也不想踩进这个坑了。

在一通折腾后，总算参考[《html svg生成环形进度条的实现方法》](https://www.jb51.net/html5/694584.html)完成了

![1.png](https://img10.360buyimg.com/ddimg/jfs/t1/122472/12/18581/140702/5fafd5c0Ed12d84af/78be7bf6bc99e683.png)

把[《html svg生成环形进度条的实现方法》](https://www.jb51.net/html5/694584.html)中的`js`控制代码改为

```javascript
let path = document.querySelector('.progress');
let len = path.getTotalLength(); //最大长度
path.style.strokeDashoffset = "300px"; #为471px减去所需百分比，见后文
```

### 连接网易云

按照已有的设计，连接网易的部分不使用原生API实现，转而使用[Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

#### 连接准备

1. 将[Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)目录下的`plugins`、`util`、`module`文件夹和`main.js`文件拷贝到项目目录下

2. 安装模块

```shell
npm install asios --save
npm install pac-proxy-agent --save
npm install tunnel --save
```

### 开始连接

#### 模块怎么引用

首先以歌单详情和歌单url为例

![ov30a.png](https://img.maocdn.cn/img/2020/11/28/ov30a.png)

![ovIKK.png](https://img.maocdn.cn/img/2020/11/28/ovIKK.png)

由官网给出的请求地址，再结合model下文件名可得

需要引用的模块名如 `/playlist/detail` 模块名为 `playlist_detail`

故得代码如下

```js
const {
    playlist_detail,
    song_url,
} = require('./main')
async function test() {
    try {
        const result = await playlist_detail({
                id: 5334910692,
            })
        console.log(result.body.playlist)
        const result4 = await song_url({
            cookie: result.body.cookie,
            id: 22699108,
        })
        console.log(result4.body)

    } catch (error) {
        console.log(error)
    }
}
test()
```

得到格式化出来的代码

![oyM1N.png](https://img.maocdn.cn/img/2020/11/28/oyM1N.png)

![ovCwS.png](https://img.maocdn.cn/img/2020/11/28/ovCwS.png)

结合文档的描述，我们可以轻易看出，需要的歌曲ID数据应在`result.body.playlist.trackIds`中

### js控制audio

参照[HTML DOM Audio 对象](https://www.w3school.com.cn/jsref/dom_obj_audio.asp)

定义一个audio标签

```html
<audio src="b.mp3" controls="controls" preload id="music" hidden>
```

播放：`DOM.play()`

暂停：`DOM.pause()`

是否暂停：`DOM.paused` 暂停返回true，否则返回false

时间控制：`DOM.currentTime`赋值控制，读值读取，以秒计

总时长：`DOM.duration` 以秒计

### 实时更新进度条进度

```javascript
path = document.querySelector('.progress');
audio = document.getElementById('music');
async function interv() {
    setInterval(function() {
        path.style.strokeDashoffset = parseInt(471 * (1 - audio.currentTime / audio.duration)).toString() + "px";
        console.log(path.style.strokeDashoffset)
    }, 100);
}

interv()
```



### 生成播放列表

首先定义一个`playlist`数组

使用`foreach`遍历返回的`result.body.playlist.trackIds`将其添加到播放列表

```javascript
result = await playlist_detail({
    id: 5334910692,
})
//console.log(result.body.playlist.trackIds)
result.body.playlist.trackIds.forEach(function(element) {
//console.log(element.id);
var muinfor = {
    src: "",
    name: ""
}
muinfor.id = element.id
playlist.push(muinfor);
console.log(muinfor)
});
```

但是，在这之后发现了一个更坑的问题

报错代码如下

```powershell
var songcheck = await check_music(reqinfor)
                ^^^^^
SyntaxError: await is only valid in async function
    at wrapSafe (internal/modules/cjs/loader.js:1051:16)
    at Module._compile (internal/modules/cjs/loader.js:1101:27)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1166:10)
    at Module.load (internal/modules/cjs/loader.js:981:32)
    at Module._load (internal/modules/cjs/loader.js:881:14)
    at Function.Module._load (electron/js2c/asar.js:769:28)
    at loadApplicationPackage (C:\Users\19355\AppData\Roaming\npm\node_modules\electron\dist\resources\default_app.asar\main.js:109:16)
    at Object.<anonymous> (C:\Users\19355\AppData\Roaming\npm\node_modules\electron\dist\resources\default_app.asar\main.js:155:9)
    at Module._compile (internal/modules/cjs/loader.js:1145:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1166:10)
```

参考[《在foreach中使用async/await的问题》](https://blog.csdn.net/yumikobu/article/details/84639025)后，发现这是foreach导致的坑，一通分析下来，大致能够改为

```javascript
result = await playlist_detail({
    id: 5334910692,
})
//console.log(result.body.playlist.trackIds)
result.body.playlist.trackIds.forEach(async function(element) {
//console.log(element.id);
var muinfor = {
    src: "",
    name: ""
}
muinfor.id = element.id
playlist.push(muinfor);
console.log(muinfor)
});
```

### 获取歌曲详情

```javascript
const result5 = await song_detail({
    ids: "347230,347231",
})
console.log(result5.body)
```

得返回结果
![1c83703e58f81c42f.png](https://img.maocdn.cn/img/2020/11/28/1c83703e58f81c42f.png)]

分析后发现是中文编码问题，因此将歌曲名作为base64编码

```javascript
let reqinfor = {}
reqinfor.ids = String(element.id)
let result5 = await song_detail(reqinfor)
Buffer.from(result5.body.songs[0].name).toString('base64')
```

#### 歌手

```javascript
let author = []
result5.body.songs[0].ar.forEach(function(element) {
    let author_infor = {}
    author_infor.name = Buffer.from(element.name).toString('base64')
    author_infor.id = element.id
    author.push(author_infor)
})
muinfor[index].author = author
```

仔细思考后发现还是不要使用base64编码，不然文件里面一片乱

#### 专辑信息

```javascript
let al = {}
al.name = result5.body.songs[0].al.name
al.pic = result5.body.songs[0].al.picUrl
al.id = result5.body.songs[0].al.id
muinfor[index].al = al
```

#### 汇总

##### 获取歌曲信息

```javascript
async function getncminfor(id) {
    let muinfor = {}
    muinfor.id = id
    muinfor.type = "ncm"
    let reqinfor = {}
    reqinfor.ids = String(element.id)
    let result5 = await song_detail(reqinfor)
    muinfor.name = result5.body.songs[0].name
    let author = []
    result5.body.songs[0].ar.forEach(function(element) {
        let author_infor = {}
        author_infor.name = element.name
        author_infor.id = element.id
        author.push(author_infor)
    })
    muinfor.author = author
    let al = {}
    al.name = result5.body.songs[0].al.name
    al.pic = result5.body.songs[0].al.picUrl
    al.id = result5.body.songs[0].al.id
    muinfor.al = al
    return muinfor
}
```

##### 保存设置

````javascript
function saveset() {
    console.log(playlist)
    let yamlStr = yaml.dump(playlist);
    fs.writeFileSync('playlist.yaml', yamlStr, 'utf8');
    yamlStr = yaml.dump(setda);
    fs.writeFileSync('setda.yaml', yamlStr, 'utf8');
}
````

##### 获取歌曲URL

```javascript
async function getncmurl(id) {
    try {
        let req = {}
        let ncmurl
        req.id = id
        var songcheck = await check_music(req)
            //console.log(songcheck.body.message)
        if (songcheck.body.success) {
            let result4 = await song_url(req)
                //console.log(reqinfor[index])
            console.log(result4.body.data[0].url)
            ncmurl = result4.body.data[0].url
        } else {
            console.log("No copyright")
        }
        return Promise.resolve(ncmurl)
    } catch (error) {
        console.log(error)
    }

}
```

##### 获取歌单详情

```javascript
async function getncmlist(id) {
    let req = {}
    req.id = id
    result = await playlist_detail(req)
    let list = []
    result.body.playlist.trackIds.forEach(async function(element, index) {
        list[index] = element.id
    });
    return list
}
```



### 使用yaml存储播放列表

首先安装

```bash
npm install js-yaml --save
```

将程序内的播放列表载入

```javascript
let playlistStr = yaml.dump(muinfor);
fs.writeFileSync('playlist.yaml', playlistStr, 'utf8');
```

得到yaml文件

![1.png](https://img.maocdn.cn/img/2020/12/06/1.png)

### 前后端连接

虽然现在前端部分尚未完成，但貌似前后端连接还是挺重要的，网易的定时失效链接调试的时候还是挺麻烦的

> 不知不觉半年都过去了，这个项目咕得有点久了，还是得补补         ——2021.4.17

#### 使用websocket

虽然`electron`本身提供了`ipc`的通信方案，但因为我以前因为使用`ipc`传输大量数据后闪退，所以选择相对更为稳定的`koa`+`websocket`方案

##### 安装依赖

```bash
npm install koa koa-route koa-websocket bufferutil utf-8-validate --save
```

##### 实现

原型来自[nodejs使用koa+websocket实现点对点的即时通讯](https://blog.csdn.net/qq_39425927/article/details/107975174)

好像一模一样欸😁

###### 服务端

```javascript
// 使用koa
const koa = require('koa')
const router = require('koa-router')()
// koa-websocket是koa封装好的websocket功能
const websocket = require('koa-websocket')
// 实例化一个ws服务
const app = websocket(new koa())

// 用来存储建立了的链接，（真实项目中请使用数据库代替）
let wsObj = {}

// 监听koa/ws路由，是否有连接
router.all('/koa/ws', (ctx) => {
    // 客户端链接传过来的客户端身份
    const { id } = ctx.query
    // 将链接保存起来
    wsObj[id] = ctx;
    // 给客户端发送链接成功信息
    ctx.websocket.send('连接成功');
    // 监听客户端发送过来的信息
    ctx.websocket.on('message', function(message) {
        console.log(message);
        // uid为接收方，将接收到的信息发送给接收方uid,可以根据自己的需求处理数据再发送
        const uid = JSON.parse(message).uId;
        if(!wsObj[uid]){
            ctx.websocket.send(`${uid}未上线`)
        }else{
            wsObj[uid].websocket.send(message)
        }
        
    });
})
// 使用路由
app.ws.use(router.routes()).use(router.allowedMethods())

//端口号后面可采用动态的
app.listen(3000, () =>
    console.log('服务启动成功')
)
```

数据库啥的就不考虑了，反正只是程序前后端之间的通信（虽然好像程序内通信用`websocket`挺奇怪的）

> 后来发现，这篇文章里的玩意还是挺坑的，估计是koa那边更新了
>
> 于是最后参考[https://github.com/kudos/koa-websocket](https://github.com/kudos/koa-websocket)

###### 客户端

```javascript
//连接后端
let mId = "play"; // 我的id
let webs = new WebSocket('ws://localhost:3000/koa/ws?id=' + mId) //websocket对象
webs.onopen = function () {
    console.log('连接成功')
}
// 接收服务器发送的信息
webs.onmessage = function (evt) {
    console.log(evt)
}

function wssend(id, content) {
    var data = {
        mId: mId,
        uId: id,
        content: content
    }
    webs.send(JSON.stringify(data))
}
```



### 从yaml内加载配置文件

```javascript
try {
    let fileContents = fs.readFileSync('./playlist.yaml', 'utf8');
    playlist = yaml.load(fileContents);
    console.log(playlist);
    fileContents = fs.readFileSync('./setda.yaml', 'utf8');
    setda = yaml.load(fileContents);
    console.log(setda);
} catch (e) {
    console.log("启动出错")
    console.log(e);
}
```



## 后续步骤

由于时间原因，暂时停于此处，日后再更