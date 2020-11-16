'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Document extends Model {
    static get table() {
        return 'documents'
    }
}

module.exports = Document
