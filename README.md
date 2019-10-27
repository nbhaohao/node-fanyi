# node-fanyi

一款基于 node 的命令行翻译工具，使用[百度翻译开放平台 API](https://api.fanyi.baidu.com/api/trans/product/index)。支持中译英、英译中。

## 安装

```bash
# yarn
yarn global add node-fanyi

# npm
npm install node-fanyi -g
```

## 示例

```bash
fy 你好
# 输入：你好
# 结果：Hello

fy hello
# 输入：hello
# 结果：你好

# 支持传入多个单词
fy hello world
输入：hello world
结果：你好世界
```

## 使用截图

![use demo]("https://github.com/nbhaohao/node-fanyi/tree/master/demo/node-fanyi-demo.gif")
