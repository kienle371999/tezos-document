'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DocumentType extends Model {
    static get table() {
        return 'document_types'
    }
}

module.exports = DocumentType
