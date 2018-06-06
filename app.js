const readExcel = require('./modules/readExcel')
const getFileList = require('./modules/getFileList')
const reName = require('./modules/reName')
const path = require('path')
const prompt = require('./modules/prompt')
const FormatName = require('./modules/formatName')

async function app() {
    await prompt.ask('请把Excel放入 /input/rule/ 文件夹下，完成请按回车')
    await prompt.ask('请把要修改的文件放入 /input/src/ 文件夹下，完成请按回车')
    let ruleFile = await prompt.ask('Excel的文件名是什么？（包括后缀名）')
    let rule = await prompt.ask('命名的规则是什么？（请按以模板形式写出，变量为 {{key}} 的形式）')
    let verify = await prompt.ask('参考的参数key名是什么？')
    let formatName = new FormatName(rule)

    console.time('promise')
    Promise.all([readExcel(ruleFile), getFileList()])
        .then(res => {
            let rules = res[0]
            let rawFileList = res[1]
            // console.log('Promise: manifest: ', rules)
            // console.log('Promise: fileList: ', rawFileList)
            console.timeEnd('promise')
            // 获取目标文件列表(排除掉.gitkeep)
            let fileList = rawFileList.filter(item => path.extname(item) !== '.gitkeep')
            // 执行操作
            fileList.map(async item => {
                let extname = path.extname(item)
                // oldName
                let oldName = path.basename(item, extname)
                // newName
                let rule = rules.filter(item => oldName === item[verify].trim())
                let newName = formatName.excute(rule[0])
                await reName(oldName, newName, extname)
            })
            prompt.ask("所有操作皆已完成，请在 /dist/ 文件夹下找到所有重命名后的文件")
            prompt.clear()
        })
        .catch(err => {
            // console.log(err)
        })
}

app()