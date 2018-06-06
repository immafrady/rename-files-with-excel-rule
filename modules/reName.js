const fs = require('fs')
const path = require('path')

const setOldPath = (oldFile, extname) => path.resolve('./input/src/', oldFile + extname)
const setNewPath = (newFile, extname) => path.resolve('./dist', newFile + extname)

module.exports = (oldName, newName, extname) => {
    const oldPath = setOldPath(oldName, extname)
    const newPath = setNewPath(newName, extname)

    fs.rename(oldPath, newPath, err => {
        if (err) console.log(err)
    })
}