# Rename Files with Excel Rules

> 基于Excel定规则来完成重命名

## Build Setup

``` bash
# 安装
npm install

# 使用（根据命令行提示一步一步执行）
npm run app
```

## 注意事项

Excel请以以下方式填写

| key1 | key2 | key3 | ... |
|:----:|:----:|:----:|:----:|
|val1[1]|val1[2]|val1[3]|...|
|val2[1]|val2[2]|val2[3]|...|
|...|...|...|...|

文件的重命名、配对以模板插值的形式完成：
`{{key1}}-{{key2}}_{{key3}}`
对应生成“val1[1]-val1[2]_val1[3]”

## 性能

### 测试环境
* 小米笔记本Pro i7
* 16G RAM
* 三星PM961

### 结果

处理3751个文件

在打印进度前提下： 耗时**30秒**
![](https://raw.githubusercontent.com/immafrady/rename-files-with-excel-rule/dev/score1.PNG)
不打印进度： 耗时**15秒**
![](https://github.com/immafrady/rename-files-with-excel-rule/blob/dev/score2.PNG)

### 业务场景

公司需要参照Excel里给出的值，对文件进行批量命名。
