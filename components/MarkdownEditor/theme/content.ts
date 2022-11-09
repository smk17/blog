export default `![](https://pic4.zhimg.com/80/v2-a5b052b1f8952997f586f530c648847d.png)

请使用 **Chrome** 浏览器。

请阅读下方文本熟悉工具使用方法，本文可直接拷贝到微信中预览。

## 1 Markdown Bore 简介

- 支持自定义样式的 Markdown 编辑器
- 支持微信公众号、知乎和稀土掘金

## 2 主题

**https://b.ore.work/themes/**

欢迎提交主题，提供更多文章示例~~

## 3 通用语法

### 3.1 标题

在文字写书写不同数量的\`#\`可以完成不同的标题，如下：

# 一级标题

## 二级标题

### 三级标题

### 3.2 无序列表

无序列表的使用，在符号\`-\`后加空格使用。如下：

- 无序列表 1
- 无序列表 2
- 无序列表 3

如果要控制列表的层级，则需要在符号\`-\`前使用空格。如下：

- 无序列表 1
- 无序列表 2
  - 无序列表 2.1
  - 无序列表 2.2

**由于微信原因，最多支持到二级列表**。

### 3.3 有序列表

有序列表的使用，在数字及符号\`.\`后加空格后输入内容，如下：

1. 有序列表 1
2. 有序列表 2
3. 有序列表 3

### 3.4 粗体和斜体

粗体的使用是在需要加粗的文字前后各加两个\`*\`。

而斜体的使用则是在需要斜体的文字前后各加一个\`*\`。

如果要使用粗体和斜体，那么就是在需要操作的文字前后加三个\`*\`。如下：

**这个是粗体**

_这个是斜体_

**_这个是粗体加斜体_**

注：由于 commonmark 标准，可能会导致加粗与想象不一致，如下

**今天天气好晴朗，**处处好风光。

这个是正常现象，请参考[加粗 Issue](https://github.com/markdown-it/markdown-it/issues/410 "加粗 Issue")。

### 3.5 链接

微信公众号仅支持公众号文章链接，即域名为\`https://mp.weixin.qq.com/\`的合法链接。使用方法如下所示：

对于该功能实现，欢迎读者查阅之前发过的文章，[今日头条闪动加载动画实现](https://mp.weixin.qq.com/s/YA-O3m2joxCvQrKA57xDUA)

### 3.6 引用

引用的格式是在符号 \`>\` 后面书写文字，文字的内容可以包含标题、链接、图片、粗体和斜体等。

一级引用如下：

> ### 一级引用示例
> 
> 读一本好书，就是在和高尚的人谈话。 **——歌德**
> 
> [Markdown Bore最全功能介绍](https://mp.weixin.qq.com/s/YA-O3m2joxCvQrKA57xDUA)
> 
> ![这里写图片描述](https://pic4.zhimg.com/80/v2-a5b052b1f8952997f586f530c648847d.png)

当使用多个 \`>\` 符号时，就会变成多级引用

二级引用如下：

>> ### 二级引用示例
>>
>> 读一本好书，就是在和高尚的人谈话。 **——歌德**
>>
>> [Markdown Bore最全功能介绍](https://mp.weixin.qq.com/s/YA-O3m2joxCvQrKA57xDUA)
>> 
>> ![这里写图片描述](https://pic4.zhimg.com/80/v2-a5b052b1f8952997f586f530c648847d.png)

三级引用如下：

>>> ### 三级引用示例
>>>
>>> 读一本好书，就是在和高尚的人谈话。 **——歌德**
>>>
>>> [Markdown Bore最全功能介绍](https://mp.weixin.qq.com/s/YA-O3m2joxCvQrKA57xDUA)
>>> 
>>> ![这里写图片描述](https://pic4.zhimg.com/80/v2-a5b052b1f8952997f586f530c648847d.png)

### 3.7 分割线

可以在一行中用三个以上的减号来建立一个分隔线，同时需要在分隔线的上面空一行。如下：

---

### 3.8 删除线

删除线的使用，在需要删除的文字前后各使用两个\`~\`，如下：

~~这是要被删除的内容。~~

### 3.9 表格

可以使用冒号来定义表格的对齐方式，如下：

| 姓名       | 年龄 |         工作 |
| :--------- | :--: | -----------: |
| 小聪明     |  18  |     打大聪明  |
| 零一       |  20  | 努力赚钱养二四 |
| 二四       |  22  |      逛街闲聊 |

宽度过长的表格可以滚动，可在自定义主题中调节宽度：

| 姓名       | 年龄 |         工作 |      邮箱       |    手机     |
| :--------- | :--: | -----------: | :-------------: | :---------: |
| 小聪明     |  18  |     打大聪明   |  xiaocm@test.com | 18012345678 |
| 零一       |  20  | 努力赚钱养二四  |    10@test.com  |  18812345678 |
| 二四       |  22  |      逛街闲聊  |    24@test.com  |  13012345678 |

### 3.10 图片

插入图片，如果是行内图片则无图例，否则有图例，格式如下：

![这里写图片描述](https://pic4.zhimg.com/80/v2-a5b052b1f8952997f586f530c648847d.png)

可以通过在图片尾部添加宽度和高度控制图片大小，用法如下：

![同时设置宽度和高度](https://pic4.zhimg.com/80/v2-a5b052b1f8952997f586f530c648847d.png =150x150)

![只设置宽度，推荐使用百分比](https://pic4.zhimg.com/80/v2-a5b052b1f8952997f586f530c648847d.png =40%x)

该语法比较特殊，其他 Markdown 编辑器不完全通用。

支持 jpg、png、gif、svg 等图片格式，**其中 svg 文件仅可在微信公众平台中使用**，svg 文件示例如下：

![i-am-svg.svg](https://1024-staging-1258723534.cos.ap-guangzhou.myqcloud.com/avatar/2022110914-QFjSUP6QV68psowU.svg)

- 支持图片**拖拽和截图粘贴**到编辑器中上传，上传时使用当前选择的图床。

**注：仅支持 https 的图片，图片粘贴到微信、知乎或掘金时会自动上传其服务器，不必担心使用上述图床会导致图片丢失**。

图片还可以和链接嵌套使用，能够实现推荐卡片的效果，用法如下：

[![Markdown Bore 最全功能介绍](https://pic4.zhimg.com/80/v2-2cafe373690e7ff9131a97c12e6a3a94.gif)](https://mp.weixin.qq.com/s/lM808MxUu6tp8zU8SBu3sg)
## 4. 特殊语法

### 4.1 脚注

> 支持平台：微信公众号、知乎。

脚注与链接的区别如下所示：

\`\`\`markdown
链接：[文字](链接)
脚注：[文字](脚注解释 "脚注名字")
\`\`\`

有人认为在[大前端时代](https://en.wikipedia.org/wiki/Front-end_web_development "Front-end web development")的背景下，移动端开发（Android、IOS）将逐步退出历史舞台。

[全栈工程师](是指掌握多种技能，并能利用多种技能独立完成产品的人。 "什么是全栈工程师")在业务开发流程中起到了至关重要的作用。

脚注内容请拉到最下面观看。

### 4.2 代码块

> 支持平台：微信公众号、知乎。

如果在一个行内需要引用代码，只要用反引号引起来就好，如下：

Use the \`printf()\` function.

在需要高亮的代码块的前一行及后一行使用三个反引号，同时**第一行反引号后面表示代码块所使用的语言**，如下：

\`\`\`java
// FileName: HelloWorld.java
public class HelloWorld {
  // Java 入口程序，程序从此入口
  public static void main(String[] args) {
    System.out.println("Hello,World!"); // 向控制台打印一条语句
  }
}
\`\`\`

支持以下语言种类：

\`\`\`
bash
clojure，cpp，cs，css
dart，dockerfile, diff
erlang
go，gradle，groovy
haskell
java，javascript，json，julia
kotlin
lisp，lua
makefile，markdown，matlab
objectivec
perl，php，python
r，ruby，rust
scala，shell，sql，swift
tex，typescript
verilog，vhdl
xml
yaml
\`\`\`

如果想要更换代码主题，可在上方挑选，不支持代码主题自定义。

diff 不能同时和其他语言的高亮同时显示，使用效果如下:

\`\`\`diff
+ 新增项
- 删除项
\`\`\`

### 4.3 数学公式

> 支持平台：微信公众号、知乎。

行内公式使用方法，比如这个化学公式：$\\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$

块公式使用方法如下：

$$H(D_2) = -\\left(\\frac{2}{4}\log_2 \\frac{2}{4} + \\frac{2}{4}\log_2 \\frac{2}{4}\\right) = 1$$

矩阵：

$$
  \\begin{pmatrix}
  1 & a_1 & a_1^2 & \\cdots & a_1^n \\\\
  1 & a_2 & a_2^2 & \\cdots & a_2^n \\\\
  \\vdots & \\vdots & \\vdots & \\ddots & \\vdots \\\\
  1 & a_m & a_m^2 & \\cdots & a_m^n \\\\
  \\end{pmatrix}
$$

公式由于微信不支持，目前的解决方案是转成 svg 放到微信中，无需调整，矢量不失真。

目前测试如果公式量过大，在 Chrome 下会存在粘贴后无响应，但是在 Firefox 中始终能够成功。

### 4.4 TOC

> 支持平台：微信公众号、知乎。

TOC 全称为 Table of Content，列出全部标题。由于示例标题过多，需要使用将下方代码段去除即可。

\`\`\`
[TOC]
\`\`\`

由于微信只支持到二级列表，本工具仅支持二级标题和三级标题的显示。

### 4.5 注音符号

> 支持平台：微信公众号。

支持注音符号，用法如下：

Markdown Bore 这么好用，简直是{喜大普奔|hē hē hē hē}呀！

### 4.6 横屏滑动幻灯片

> 支持平台：微信公众号。

通过\`<![](url),![](url)>\`这种语法设置横屏滑动滑动片，具体用法如下：

<![蓝1](https://pic4.zhimg.com/80/v2-c9c93ba97d102aaf15feeb900dbdb7e0.jpg),![绿2](https://pic4.zhimg.com/80/v2-7bdcaa4bf0c77bed7cff041fcf696312.jpg),![红3](https://pic4.zhimg.com/80/v2-3692e14a17fc2bb9267343437c7deba4.jpg)>

## 5 其他语法

### 5.1 HTML

支持原生 HTML 语法，请写内联样式，如下：

<span style="display:block;text-align:right;color:orangered;">橙色居右</span>
<span style="display:block;text-align:center;color:orangered;">橙色居中</span>

### 5.2 UML

不支持，推荐使用开源工具\`https://draw.io/\`制作后再导入图片

### 5.3 更多文档

更多文档请参考 [Markdown-Bore-docs](https://b.ore.work/articles/ "更多文档")
`