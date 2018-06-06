const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

module.exports = {
    ask: question => {
        return new Promise((resolve, reject) => {
            try {
                rl.question(question + ' > ' , res => {
                    resolve(res)
                })
            } catch (e) {
                reject(e)
            }
        })
    },
    clear: () => {
        rl.close()
    }
}