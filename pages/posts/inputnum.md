---
title: 基本组件系列——数字输入框
date: 2020-05-23 15:12:28
tags: ["基础组件","编程","代码留档"]
categories: ["编程","基础组件"]
---

## 写在前面

这个系列只是用于记录自己过去写过的代码，避免自己重复做无用功

### 这个是什么

这个玩意只是对于ant design中[数字输入框](https://ant.design/components/input-number-cn/)的原生实现

由于采用了flex布局，导致兼容性可能有所下降

<!-- more -->

## 贴出代码

js部分

```javascript
[].forEach.call(document.querySelectorAll(".inputnum>div:last-child>div:first-child"), function (item, index, input) {
    item.onclick = function () {
        if (this.parentNode.parentNode.querySelector("input").value == "") {
            this.parentNode.parentNode.querySelector("input").value = "0"
        }
        this.parentNode.parentNode.querySelector("input").value = (parseInt(this.parentNode.parentNode.querySelector("input").value) + 1).toString()
        this.parentNode.parentNode.querySelector("input").focus();
    };
});
[].forEach.call(document.querySelectorAll(".inputnum>div:last-child>div:last-child"), function (item, index, input) {
    item.onclick = function () {
        if (this.parentNode.parentNode.querySelector("input").value == "") {
            this.parentNode.parentNode.querySelector("input").value = "0"
        }
        this.parentNode.parentNode.querySelector("input").value = (parseInt(this.parentNode.parentNode.querySelector("input").value) - 1).toString()
        this.parentNode.parentNode.querySelector("input").focus();
    };
});
```

HTML部分

```html
                    <div class="inputnum">
                        <input oninput="value=value.replace(/[^\d]/g,'')"></input>
                        <div>
                            <div><svg class="icon" aria-hidden="true">
                                    <use xlink:href="#iconshang"></use>
                                </svg></div>
                            <div><svg class="icon" aria-hidden="true">
                                    <use xlink:href="#iconxia"></use>
                                </svg></div>
                        </div>
                    </div>
		<script src = "//at.alicdn.com/t/font_1692769_xpkzsmmcyb.js"></script>
```

css部分

```css
        .inputnum {
            width: 111px;
            height: 53px;
            display: flex;
            border-color: #D0CECE;
            border-width: 1px;
            border-radius: 8px;
            border-style: solid;
            margin: 3px;
        }
        
        .inputnum>input:first-child {
            width: 75%;
            border-style: none;
            border-radius: 8px;
            outline: none;
            color: var(--theme, #13C2C2);
            font-size: 28px;
            text-align: center;
        }
        
        .inputnum>input:first-child:focus {
            border-style: none;
        }
        
        .inputnum>div:last-child {
            width: 25%;
            height: 100%;
            border-left-color: var(--theme, #13C2C2);
            border-width: 1px;
            border-left-style: solid;
            border-bottom-style: none;
            border-right-style: none;
            border-top-style: none;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column
        }
        
        .inputnum>div:last-child>div {
            width: 100%;
            height: 45%;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all .2s 0s;
        }
        
        .inputnum>div:last-child>div:hover {
            height: 55%;
        }
        
        .inputnum>div:last-child>div:first-child {
            border-bottom-color: var(--theme, #13C2C2);
            border-width: 1px;
            border-bottom-style: solid;
            border-left-style: none;
            border-right-style: none;
            border-top-style: none;
        }
        
        .inputnum>div:last-child>div>svg {
            font-size: 23px;
            color: var(--theme, #13C2C2);
            width: 1em;
            height: 1em;
            vertical-align: -0.15em;
            fill: currentColor;
            overflow: hidden;
        }
```

## 结果展示
