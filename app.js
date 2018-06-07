const readExcel = require('./modules/readExcel')
const getFileList = require('./modules/getFileList')
const reName = require('./modules/reName')
const path = require('path')
const prompt = require('./modules/prompt')
const FormatName = require('./modules/formatName')
const fs = require('fs')

async function app() {
    await prompt.ask('请把Excel放入 /input/rule/ 文件夹下，完成请按回车')
    await prompt.ask('请把要修改的文件放入 /input/src/ 文件夹下，完成请按回车')
    let ruleFile = await prompt.ask('Excel的文件名是什么？（包括后缀名，默认为“rule.xlsx”）')
    let rule = await prompt.ask('命名的规则是什么？（请按以模板形式写出，变量为 {{key}} 的形式）')
    let verify = await prompt.ask('参考的参数名是什么？（请按以模板形式写出，变量为 {{key}} 的形式）')
    verify = verify.trim()
    let formatName = new FormatName(rule)
    let verifyName = new FormatName(verify)

    console.time('all')
    console.time('promise')
    Promise.all([readExcel(ruleFile), getFileList()])
        .then(res => {
            // 路径不存在则创建新路径
            let dist = path.resolve('./dist')
            if (!fs.existsSync(dist)) fs.mkdirSync(dist)
            // 变量赋值
            let rules = res[0]
            let fileList = res[1]
            console.timeEnd('promise')
            let length = fileList.length
            let count = 0
            // 执行操作
            fileList.map(async item => {
                // 后缀名
                let extname = path.extname(item)
                // oldName
                let oldName = path.basename(item, extname)

                // newName
                let rule = rules.filter((item, idx) =>{
                    let verName = verifyName.execute(item)
                    if (oldName === verName) {
                        rules.splice(idx,1)
                        return true
                    } else {
                        return false
                    }
                })
                if (rule[0]) {
                    let newName = formatName.execute(rule[0])
                    reName(oldName, newName, extname)
                }
                console.log(`已完成处理文件： ${++count}/${length}`)
            })

            prompt.ask("所有操作皆已完成，请在 /dist/ 文件夹下找到所有重命名后的文件")
            prompt.clear()
            console.timeEnd('all')
        })
}

app().catch(err => console.log(err))