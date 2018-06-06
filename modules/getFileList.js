const fs = require('fs')

const root = process.cwd()

module.exports = () => {
    return new Promise((resolve, reject) => {
        try {
            fs.readdir(root + '/input/src/', null, (err, files) => {
                if (err) reject(err);
                resolve(files)
            })
        } catch (err) {
            reject(err)
        }
    })
}