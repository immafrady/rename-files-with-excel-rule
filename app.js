const readExcel = require('./modules/readExcel')
const getFileList = require('./modules/getFileList')
const reName = require('./modules/reName')

async function run() {
    console.time("promise")
    Promise.all([readExcel(), getFileList()])
        .then(res => {
            let manifest = res[0]
            let fileList = res[1]
            console.log('Promise: manifest: ', manifest)
            console.log('Promise: fileList: ', fileList)
            console.timeEnd("promise")
        })
        .catch(err => {
            console.log(err)
        })
}
run()