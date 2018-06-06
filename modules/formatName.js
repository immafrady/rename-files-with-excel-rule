module.exports = class {
    constructor(rule) {
        this.rule = rule.trim()
        this.reg = /{{([^}}]+)?}}/g
    }

    execute (options) {
        return this.rule.replace(this.reg, (match, p0) => {
            if (options[p0]) return options[p0].trim()
        })
    }
}