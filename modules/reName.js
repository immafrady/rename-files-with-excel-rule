const fs = require('fs')
const path = require('path')

const setOldPath = (oldFile, extname) => path.resolve('./input/src/', oldFile + extname)
const setNewPath = (newFile, extname) => path.resolve('./dist', newFile + extname)

module.exports = (oldName, newName, extname) => {
    //路径不存在则创建新路径
    let dist = path.resolve('./dist')
    if (!fs.existsSync(dist)) fs.mkdirSync(dist)

    return new Promise((resolve, reject) => {
        const oldPath = setOldPath(oldName, extname)
        const newPath = setNewPath(newName, extname)

        fs.rename(oldPath, newPath, err => {
            if (err) {
                reject(err)
            } else {
                resolve(`${oldName}已经更名为${newName}`)
            }
        })
    })
}