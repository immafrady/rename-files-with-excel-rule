const readExcel = require('./modules/readExcel')
const getFileList = require('./modules/getFileList')
const reName = require('./modules/reName')
const path = require('path')

async function app() {
    console.time("promise")
    Promise.all([readExcel(), getFileList()])
        .then(res => {
            let rules = res[0]
            let rawFileList = res[1]
            console.log('Promise: manifest: ', rules)
            console.log('Promise: fileList: ', rawFileList)
            console.timeEnd("promise")
            // 获取目标文件列表(排除掉.gitkeep)
            let fileList = rawFileList.filter(item => path.extname(item) !== '.gitkeep')
            // 执行操作
            fileList.map(async item => {
                let extname = path.extname(item)
                // oldName
                let oldName = path.basename(item, extname)
                // newName
                let rule = rules.filter(item => oldName === item.id.trim())
                console.log(rule)
                let newName = `${rule[0].no.trim()}_${rule[0].id.trim()}-${rule[0].name.trim()}`

                console.log(await reName(oldName, newName, extname))
            })
        })
        .catch(err => {
            console.log(err)
        })
}

app()