module.exports = class {
    constructor(rule) {
        this.rule = rule
        this.reg = /{{([^}}]+)?}}/g
    }

    excute (options) {
        return this.rule.replace(this.reg, (match, p0) => {
            if (options[p0]) return options[p0].trim()
        })
    }
}