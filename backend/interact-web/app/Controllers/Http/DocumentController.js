'use strict'
const { validate } = use('Validator')
const DocumentType = use('App/Models/DocumentType')
const DocumentService = use('App/Services/DocumentService')


class DocumentController {
    async createDocType({ request, response, auth }) {
        const rules = {
            documentType: 'required|string',
            listAttribute: 'required|string'
        }

        const { documentType, listAttribute } = request.all()
        const validation = await validate({ documentType, listAttribute }, rules)

        if(validation.fails()) {
            return response.badRequest(validation.messages())
        }

        const result = await DocumentService.createDocType({ params: request.all(), auth })
        return response.ok(result)
    }

    async getAllDocType({ request, response, auth }) {
        const result = await DocumentService.getAllDocType({ auth })
        return response.ok(result)
    }

    async createDocument({ request, response, auth }) {
        const rules = {
            id: 'required|number',
            name: 'required|string',
            identityNumber: 'required|string',
            address: 'required|string',
            additionalInfo: 'required|string'
        }

        const { id, name, identityNumber, address, additionalInfo } = request.all()
        const validation = await validate({ id, name, identityNumber, address, additionalInfo }, rules)
        if(validation.fails()) {
            return response.badRequest(validation.messages())
        }

        const res = await DocumentService.createDocument({ params: request.all(), auth })
        return res
    }

    async getAllDocument({ request, response, auth }) {
        const result = await DocumentService.getAllDocument({ auth })
        return response.ok(result)
    }

    async getDocumentToString({ request, response }) {
        const rules = {
            identityNumber: 'required|string'
        }

        const { identityNumber } = request.all()
        console.log("getDocumentToString -> identityNumber", identityNumber)
        const validation = await validate({ identityNumber }, rules)
        if(validation.fails()) {
            return response.badRequest(validation.messages())
        }

        const res = await DocumentService.getDocumentToString({ params: request.all() })
        return response.ok(res)
    }

    async createSignature({ request, response }) {
        const rules = {
            identityNumber: 'required|string',
            signature: 'required|string'
        }

        const { identityNumber, signature } = request.all()
        const validation = await validate({ identityNumber, signature }, rules)
        if(validation.fails()) {
            return response.badRequest(validation.messages())
        }

        const result = await DocumentService.createSignature({ params: request.all() })
        return response.ok(result)
    }

    async storeBlockchainHash({ request, response }) {
        const rules = {
            identityNumber: 'required|string',
            blockchain_hash: 'required|string'
        }

        const { identityNumber, blockchain_hash } = request.all()
        const validation = await validate({ identityNumber, blockchain_hash }, rules)
        if(validation.fails()) {
            return response.badRequest(validation.messages())
        }

        await DocumentService.createBlockchainHash({ params: request.all() })
        return response.ok({ message: 'Done' })
    }

    async getDocType({ request, response, params }) {
        const rules = {
            id: 'required|number'
        }
        const { id } = params
        const validation = await validate({ id }, rules)
        if(validation.fails()) {
            return response.badRequest(validation.messages())
        }

        const res = await DocumentService.getDocType({ params: params })
        return response.ok(res)
    }

    async getDocumentByCredential({ request, response }) {
        const rules = {
            credential_number: 'required|string'
        }
        const { credential_number } = request.all()
        const validation = await validate({ credential_number }, rules)
        if(validation.fails()) {
            return response.badRequest(validation.messages())
        }

        const res = DocumentService.getDocumentByCredential({ params: request.all() })
        return res
    }
}

module.exports = DocumentController
