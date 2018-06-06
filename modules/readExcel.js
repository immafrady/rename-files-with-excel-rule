// const fs = require('fs')
// const convertExcel = require('excel-as-json').processFile
const root = process.cwd()
const XLSX = require('xlsx')

const baseDir = root + '/input/rule/' + 'input.xlsx'

module.exports = () => {
    return new Promise((resolve, reject) => {
        try {
            const workBook = XLSX.readFile(baseDir)
            const sheetNames = workBook.SheetNames
            const worksheet = workBook.Sheets[sheetNames[0]]

            resolve(XLSX.utils.sheet_to_json(worksheet))
        } catch (err) {
            reject(err)
        }
    })
};