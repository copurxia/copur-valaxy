---
title: 宝塔vps面板+hexo的网站搭建
tags:
  - 分享
  - 建站
author: 乐得自在
date: 2020-06-20 21:04:37
updated: 2020-06-20 21:04:37
---

## 宝塔面板的安装

这一步相信挺多人其实都会，所以，这里就不累述了
[传送门](https://www.bt.cn/bbs/thread-19376-1-1.html)

## 安装nodejs

因为centos源里的nodejs版本太低了，经常会出问题，经过多次折腾后，我选择了nvm的方式

当然了，nvm也是会更新的 请参考你看到这篇文章时的nvm官方安装
<!-- more -->

```shell
#运行这句前请确保已安装git
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

```

将下面的语句写入`.bash_profile`,并手动执行一次或重启

将`/root/.nvm`移动到`/opt/.nvm`以实现多用户调用（这步随便你执行与否，反正后文的更新主题脚本要用到）

```shell
export NVM_DIR=/opt/.nvm
source /opt/.nvm/nvm.sh
export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node  #这句用于你的机子在国内的情况。
```

好了，现在nvm可以用了

接下来便是nvm的3连操作

```shell
nvm ls-remote #查询可用的node版本
nvm install 14.4.0 #我选择的是最新版本，版本可以由你自己选
nvm use 14.4.0 #这句如果你只安装了一个node版本便是可以舍弃的
```

## 安装hexo

这里之前的文章讨论过了，此处便不在累述

[传送门](https://dist.copur.xyz/post/hugo-github-to-hexo-gitlab/?t=1592659678976)

## 安装hexo-myadmin

虽然你也可以选择和以前一样，但你都有vps了，为啥不折腾个后台嘞？

[https://github.com/thesadabc/hexo-myadmin](https://github.com/thesadabc/hexo-myadmin)

[hexo-admin](https://www.npmjs.com/package/hexo-admin)和[hexo-local-admin](https://www.npmjs.com/package/hexo-local-admin)相信大家能自己折腾

```shell
npm i hexo-myadmin --save
hexo server
#或者使用pm2,当然貌似宝塔自己也有个pm2插件，不过我搞不懂怎么用
pm2 start node_modules/.bin/hexo -- server
```

访问 域名:4000/admin

密码保护之类的就参考官方文档好了

## 启动网站

在hexo目录下使用hexo g生成页面，在宝塔的网站管理中创建一个静态网站指向你hexo目录下的public文件夹

绑定ssl什么的相信不是难事

### 如何使用自定义的404页面

打开nginx的配置文件

写上`error_page 404 /404.html;`不过好像宝塔生成的nginx配置里有这个注释，直接取消注释就好 /404.html改为你想要的404页面

### 403错误

检查你博客根目录权限与root是否一致

### 如何自动更新主题？

```shell
export NVM_DIR=/opt/.nvm
source /opt/.nvm/nvm.sh
cd 你的博客根目录/themes/yun/ #yun替换为你的主题名称
git pull
cd 你的博客根目录
hexo clean
hexo g
```