---
title: 远程桌面服务配置的部分记录
date: 2022-06-2 14:10:28
tags: ["服务配置","snapdrop"]
categories: ["服务配置"]
---

# 局域网文件传输的方案解决

​		随着工作学习传输文件的需求日益加大以及无法承受高昂的云同步服务以及即时通讯软件文件传送速度的日益下滑，遂开始寻求更方便的文件传输方案，nas等方案由于成本过高，暂时舍弃

## Huawei Share

​		不依赖与局域网（或者说会自动完成热点建立）

​		目前个人最推荐的Windows文件传送方案，但由于其为品牌独有功能，不利于协作，所以需要其他的文件传送方案作为保底补充，同理舍弃的还有Airdrop。

![image-20220602142833066](../../public/image/image-20220602142833066.png)

## 就近共享

Windows 10起自带

​		本来有考虑将该功能作为保底方案，但很可惜在第一次使用时花费了许久才发现另一台设备，故舍弃。

![image-20220602143104635](../../public/image/image-20220602143104635.png)

## 文件快传服务

​			[文叔叔](https://www.wenshushu.cn/)和[奶牛快传](https://cowtransfer.com/)服务虽然传输速度相对较快，但对大文件均有不同程度限制，无法满足需求。此外，先上传后下载的策略相对耗费更多时间，而且无法保证文件安全。

## 坚果云类同步

​		体验不错，同理无法满足大文件快传需求，符合其同步盘的定位而非本次快传的需求

## Snapdrop

​		在[《有沒有支持跨平台的 Airdrop 呢？》](https://sspai.com/post/67112)一文的指导下了解到Snapdrop，但在笔者尝试的时候，[Snapdrop官方](https://snapdrop.net/ )似乎已经无法使用，在了解到存在自己部署的版本[node-snapdrop](https://github.com/Bellisario/node-snapdrop)后进行自己部署，相关部署过程可以参考[Cpl.Kerry](https://rickg.cn/)的[《在自有服务器上部署Snapdrop》](https://rickg.cn/2022/05/28/deploy-snapdrop/)

## 后记

​		在经过一段时间的使用后，Snapdrop较为符合本次需求，能够很好地作为`Huawei Share`和`Snapdrop`的补充，虽然速度有待提升，以及依赖局域网环境，但总体表现仍然优于以上各类替代方案
