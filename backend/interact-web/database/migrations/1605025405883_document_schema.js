'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DocumentSchema extends Schema {
  up () {
    this.create('documents', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.integer('document_type_id').unsigned()
      table.string('name').notNullable()
      table.string('identity_number').notNullable().unique()
      table.string('address').notNullable()
      table.string('additional_information')
      table.string('credential_number')
      table.string('signature')
      table.string('blockchain_hash').unique()
      table.boolean('is_broadcasted').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('documents')
  }
}

module.exports = DocumentSchema
