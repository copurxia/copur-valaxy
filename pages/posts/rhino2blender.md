---
title: rhino→blender流程的几种可能性
date: 2022-11-15 09:12:28
tags: ["建模","工作流","流程分析"]
categories: ["建模","工作流"]
---

由于专业需求会更多的走这个流程，故此研究

当然由于两者的构建思维基本不同，最好的方案还是直接在blender内重建一次，倘若有动画之类的需求

<!-- more -->

**Import 3dm插件**

插件地址：

https://github.com/jesterKing/import_3dm

import 3dm插件基于rhino3dm模块

但由于blender的颠覆式更新，该插件的更新速度无法追上blender官方的速度

![img](http://world.qpic.cn/psc?/world/O0cFsaTfOlqjIAnYAvw8Wh6SV6flEv2YCGIvKh7lgJIdFmfkJg3CLSK6Y6iqAxq1ytO9U3.da7M*a.4*rXyIMAF3Vb4*ErHs5oayRkJH.VI!/b=&bo=KgVMBCoFTAQRHyg!&ek=1&tl=1&tm=1668475329)        我甚至无法正常启用了

就以前使用体验来看，该插件可以直接读取3dm文件，因此在导入文件时可以选择导入具体的图层和物件，但布线极其混乱，甚至难以区分不同的面，会对后续流程产生影响，故此放弃。

**rhino→keyshot→fbx流程**

由于keyshot的高兼容性，借由keyshot作为中间过程，由keyshot导出fbx文件再导入blender低较为实用的一种方法。

不过导入时会同步导入keyshot相机。

​                 ![img](http://world.qpic.cn/psc?/world/O0cFsaTfOlqjIAnYAvw8WoYRjuvqQ4vFCV.Edz8RWrMJg*.7u4Mlgra4WQ1oaUPrU9.3IeYposrirJ7yKdZprDExFD0aFaysHk6*DXg.G8I!/b=&bo=CALQAQgC0AERHyg!&ek=1&tl=1&tm=1668475329)        为避免破坏场景，建议在新的集合内导入。

同时因为尺寸问题，可能需要不同程度的缩放，可以在导入时进行选择

​                 ![img](http://world.qpic.cn/psc?/world/O0cFsaTfOlqjIAnYAvw8WkHlNWAel.lhWnegSN4NlufKVS0R1am6Aa4qeTmUkRbR5XFmYV3mI6IVmGfx7brYdSYhonDzJA4C7JWF6xLyQ6s!/b=&bo=5AHOA.QBzgMRHyg!&ek=1&tl=1&tm=1668475329)

keyshot导出fbx的朝向与blender相同，如果是其他软件可能需要手动指定轴方向（万年老问题了![img](http://world.qpic.cn/psc?/world/O0cFsaTfOlqjIAnYAvw8WuV5*IJcD8Z*jPtt5iB6kZTj42zVw1FigjS*j4*weG8tjrlvZp6FhO7gGL0Ic1a80dXj7q77YeVFYyHDQAZCLKw!/b=&bo=zAYEBcwGBAURHyg!&ek=1&tl=1&tm=1668475329)        同时也可以看到，该方案导入的布线同样不是很符合我们期望（但至少能用

因此可能需要重拓扑，不过作为单纯的渲染是已经符合需求了

此外还可以通过better_fbx插件来获取更多的导入时选项

注意better_fbx的导入缩放基本正确，如果需要手动缩放和官方fbx导入有所不同

​                 ![img](http://world.qpic.cn/psc?/world/O0cFsaTfOlqjIAnYAvw8WgE1D4aoPK4teXt0xROqkgkhVs5wcwwpusEr1yAIxX2QQPtFZeawWyCqlHSc.7HJ7m6WUULLgacBzos8OriF3Ns!/b=&bo=zAEcBMwBHAQRHyg!&ek=1&tl=1&tm=1668475329)                         ![img](http://world.qpic.cn/psc?/world/O0cFsaTfOlqjIAnYAvw8WihDnEw7V16ooaororAhOz7Zkc3ELow5RUlYKc6o4xRViTU9Xh1vFEC30kgige6veM8sHLCRHAu54qbitESUHhk!/b=&bo=zAH.A8wB*gMRHyg!&ek=1&tl=1&tm=1668475329)

**此外可能的方案**

- 在rhino中使用subd进行构建，并且在导出时压边（我未曾使用但是有群友推荐

- 在rhino中使用细分工具的转四边面操作，直接曲面转换和转网格转换是两种不同的效果，然后使用硬表面插件自动锐化处理发现和分UV

其实就各种方案而言，跨blender工作流都不是很完美，当然这也是blender的重要问题之一

不过根据之前的消息，**Blender基金会决定收回之前停止在Blender 中使用VFX参考平台的决定。**或许在未来blender与其他软件的衔接流程能有所改善吧，激进了那么久了，确实也该缓一缓了。

不过个人认为，Python也应当为这种负责，python在进行着同样的颠覆式更新，而Python作为blender插件以及blender编程的主要语言，或多或少影响到了blender，blender插件的作者们一次次地去追官方版本更新，有的最终放弃只维护LTS版本，而作为主要的生产衔接，VFX参考平台会首先考虑稳定性问题，两者相互矛盾，这也是之前blender想要放弃支持VFX的原因（然后给骂惨了

按照之前的安排，2023第三季度会有完全支持VFX决定的审查（好拖

之后blender的渲染器生态以及衔接或许都会得到改善吧

另外新版的blender同样可以选择python3.9而非3.10进行构建（不过非官方的构建版本有可能会出现问题
