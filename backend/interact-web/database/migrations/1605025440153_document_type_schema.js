'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DocumentTypeSchema extends Schema {
  up () {
    this.create('document_types', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.string('document_type').notNullable()
      table.string('list_attribute').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('document_types')
  }
}

module.exports = DocumentTypeSchema
