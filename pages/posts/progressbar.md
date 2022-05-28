---
title: 基本组件系列——进度条
date: 2020-05-23 16:12:28
tags: ["基础组件","编程","代码留档"]
categories: ["编程","基础组件"]
---

## 写在前面

这个系列只是用于记录自己过去写过的代码，避免自己重复做无用功

### 这个是什么

这个玩意只是对于ant design中[进度条](https://ant.design/components/progress-cn/)的原生实现

<!-- more -->

## 贴出代码

HTML部分

```html
<div class="progressbox">
	<div style="width: 50%;" class="progressbar"></div>
</div>
```

css部分

```css
.progressbox {
    border-style: none;
    border-radius: 10px;
    height: 6px;
    width: 100%;
    background-color: #ededed;
}

.progressbar {
    background-color: var(--theme, #13c2c2);
    border-radius: 100px;
    height: 6px;
    transition: all 0.8s cubic-bezier(0.08, 0.82, 0.17, 1) 0s;
}

.progressbar::before {
    height: 6px;
    border-radius: 100px;
    animation: progress 2.4s infinite cubic-bezier(0.23, 1, 0.32, 1);
    content: "";
    display: block;
}

@keyframes progress {
    from {
        width: 0%;
        background: rgba(255, 255, 255, 0.4);
    }
    to {
        width: 100%;
        background: rgba(255, 255, 255, 0.1);
    }
}
```

## 结果展示
