const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

module.exports = {
    ask: question => {
        return new Promise(resolve => {
            rl.question(question + ' > ' , res => {
                resolve(res)
            })
        })
    },
    clear: () => {
        rl.close()
    }
}