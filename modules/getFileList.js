const fs = require('fs')
const path = require('path')

let baseDir = path.resolve('./input/src/')

module.exports = () => {
    return new Promise((resolve, reject) => {
        try {
            fs.readdir(baseDir, null, (err, files) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(files)
                }
            })
        } catch (err) {
            reject(err)
        }
    })
}