---
title: "从Hugo+github迁移到hexo+gitlab"
date: 2020-05-04 09:05:16
tags: ["分享"]
---

因为GitHub那边SEO问题老是难以解决，而且每次构建再上传的过程特别繁琐，因此就从github迁移到了gitlab。
<!-- more -->

## 本地建立Hexo站点

安装nodejs和git应该不用说了吧？毕竟是从github+hugo迁移过来的。

具体可以参考[云游君的文章](https://www.yunyoujun.cn/share/how-to-build-your-site/)

```shell
npm install hexo-cli -g
hexo init hello.gitlab.io
cd hello.gitlab.io
npm install
```

主题建议用云游君的[Hexo-theme-yun](https://yun.yunyoujun.cn/)或者MARKSZ的[Hexo-theme-melody](https://molunerfinn.com/hexo-theme-melody-doc/zh-Hans/)

因为云游君的文章已经用Hexo-theme-yun示范了，我这里就用Hexo-theme-melody吧

至于为什么选择这两个主题，一个是next主题的hexo实在太多了，另外就是这两个主题的功能也挺多

接下来继续上面的终端运行

```shell
git clone -b master https://github.com/Molunerfinn/hexo-theme-melody themes/melody
```

打开当前目录下的`_config.yml`当然你也可以选择继续使用终端命令

```shell
notepad ./_config.yml   #windows
vim ./_config.yml       #linux
nano ./_config.yml
gedit ./_config.yml
```

mac因为没用过也不知道是什么，不过推荐还是使用vscode这类代码编辑器打开去打开

这里可以修改你的站点信息，而且需要去theme字段将其设为melody

和Hexo-theme-yun一样，需要pug和stylus

```shell
npm install hexo-renderer-pug hexo-renderer-stylus --save
```

当然推荐在source/_data目录下新建一个`melody.yml`用来管理主题设置

至于主题设置什么的当然是自己去看文档，这里就不多谈了

## git配置

这里首先假设你已经注册好gitlab账号，这种应该不用教吧？

和github类似，需要创建一个用户名.gitlab.io的项目，可见性建议设为私有

参考[https://gitlab.com/help/ssh/README#generating-a-new-ssh-key-pair](https://gitlab.com/help/ssh/README#generating-a-new-ssh-key-pair)生成你的ssh密钥，接着去gitlab账户里面记录，当然GitHub那边生成的ssh密钥这边也是能用的，不用重复生成

执行以下命令

```shell
git init    #把这个文件夹初始化为git仓库
git remote add origin git@gitlab.com:hello/hello.gitlab.io.git #hello替换为你的gitlab用户名
```

然后便是熟悉的一连串操作

```shell
$ git add .  #添加文件
$ git commit -m 'msg'  #添加注释并合并至本地git仓库
$ git push  #提交至远程仓库
```

当然，这样上传你会发现是没用的，因为gitlab和Github不同，gitlab page需要ci构建生成。

接下来我们在当前目录新建一个`.gitlab-ci.yml`文件，内容如下

```yml
image: node:10.15.3

cache:
  paths:
    - node_modules/

before_script:
  - npm install hexo-cli -g
  - test -e package.json && npm install
  - npm install hexo-renderer-pug hexo-renderer-stylus --save
  - git clone -b master https://github.com/Molunerfinn/hexo-theme-melody themes/melody
  - npm audit fix

pages:
  script:
    - hexo clean
    - hexo generate
  artifacts:
    paths:
      - public
  only:
    - master
```

此外，为了方便推送，最好在目录下新建一个shell脚本，Windows用bat或cmd，linux用sh

```shell
git add .
git commit -m 'update'
git push -u origin master
```

执行这个脚本就会把项目推送到gitlab了，去gitlab的CI/CD→流水线就可以看到了

接着，去gitlab的项目设置将page设置为公开

绑定域名什么的就是后话了

## 数据迁移

首先是valine，valine是以路径为依据的，只需要去learncloud那边把路径改掉即可

其次是文章，页面需要依据主题重新添加，而文章需要从post搬迁到_post，头部需要把时间格式修改