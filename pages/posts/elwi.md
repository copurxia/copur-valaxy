---
title: edgeless for Linux食用手册
date: 2020-05-16 21:26:28
tags: ["edgeless","编程"]
categories: ["编程","edgeless"]
---

## 完善的文档

首先声明，这不是PE，这是用于优化wine体验的玩意

首先，因为这个是内测版应用，所以wine、7z、文泉驿和容器等依赖都未实现自动安装

所以第一步当然就是安装wine 7z 文泉驿啦

<!-- more -->

这几个应该不用介绍了，毕竟不同系统的安装方式不一样，而且怎么装软件应该也是常识了。

接着运行加载器，如果没有正常打开请右键属性使其成为一个可执行程序或其它花里胡哨的方式，别问我命令行，问就是图形界面能完成。

运行后将要加载的插件包拖入弹出的终端窗口

![img](https://dist.copur.xyz/images/elwi.png)

若是第一次运行则会提示下载运行容器，建议输入1从直链服务器下载

下载完毕之后插件便是自动加载了

当然，如果曾经加载过某个插件而又没有处理干净的，可能会出现7z的提示是否覆盖文件，这种直接打个A全部替换了。

如果是只会创建桌面图标的插件，可能需要手动去用户文件夹的桌面文件夹将生成的快捷方式丢到合适位置。

至于为什么要做这玩意，那就别问了，内测期间更希望能听到反馈，何况我经常会不在线。

由于是内测，下载就只允许通过群文件下载了

反馈欢迎通过群里联系路人甲或留于页面下方评论区

## 简单版文档

相信大家懒得看前面的废话

归结为以下几步

1. 打开程序
2. 把要加载的插件包拖进去
3. 没容器按照提示下载安装，有容器开始加载

## 容器升级日志

>  0.0.2.1355 修复重现0.0.1

> 0.0.2.1411 解除依赖文泉驿，更新字体为更纱黑体

> 0.0.2.1432 修复字体映射 修复wineconsole设置

> 0.0.2.1443 补全常用运行库

---

0.0.2.1443[下载地址](https://alumnialbany-my.sharepoint.com/:u:/g/personal/yang_alumni_albany_edu/EWPKzr07uotIu01Q7hoGxGwBpq5nOGPB0dG0-6-FuJBS2g?e=5vLa4Z)

https://alumnialbany-my.sharepoint.com/:u:/g/personal/yang_alumni_albany_edu/EWPKzr07uotIu01Q7hoGxGwBpq5nOGPB0dG0-6-FuJBS2g?e=5vLa4Z

