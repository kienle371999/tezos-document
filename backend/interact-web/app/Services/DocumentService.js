'use strict'
const Document = use('App/Models/Document')
const DocumentType = use('App/Models/DocumentType')
const ErrorFactory = use('App/Common/ErrorFactory')

class DocumentService {
    static async createDocType({ params, auth }) {
        const { documentType, listAttribute } = params

        const document = await DocumentType.query()
                                        .where('user_id', auth.user.id)
                                        .andWhere('document_type', documentType)
                                        .first()
        if(document) {
            return ErrorFactory.badRequest('Duplicated document type in same account')
        }
        
        const documentRes = await DocumentType.create({
            user_id: auth.user.id,
            document_type: documentType,
            list_attribute: listAttribute
        })

        return documentRes
    }

    static async getAllDocType({ auth }) {
        const allDocType = await DocumentType.query()
                                            .where('user_id', auth.user.id)
                                            .fetch()
                                            
        return allDocType
    }

    static async createDocument({ params, auth }) {
        const { id, name, identityNumber, address, additionalInfo } = params
        const checkDocType = await DocumentType.findBy('id', id)
        if(!checkDocType) {
            return ErrorFactory.notFound(`Don't have Document Type with ${id} id`)
        }

        const checkDocument = await Document.findBy('identity_number', identityNumber)
        if(checkDocument) {
            return ErrorFactory.badRequest('Duplicate Information')
        }
        const credential = await this.getCredential()
       
        const document = await Document.create({
            user_id: auth.user.id,
            document_type_id: id,
            name: name,
            identity_number: identityNumber,
            address: address,
            additional_information: additionalInfo,
            credential_number: credential
        })

        return document
    }

    static async getAllDocument({ auth }) {
        const allDoc = await Document.query()
                                    .where('user_id', auth.user.id)
                                    .fetch()
        
        return allDoc
    }

    static async getCredential() {
        let result = null
        let credential = null
        do {
            let base = 'UET'
            let number = Math.floor(Math.random() * 8999 + 1000)
            credential = base.concat(number)
            result = await Document.findBy('credential_number', credential)
        }
        while(result)
        
        return credential
    }

    static async getDocumentToString({ params }) {
        const { identityNumber } = params
        const document = await Document.query()
                                    .select('id', 'user_id', 'name', 'identity_number', 'address', 'additional_information', 'credential_number')
                                    .where('identity_number', identityNumber)
                                    .fetch()
        console.log("getDocumentToString -> document", document)
        return document
    }

    static async createSignature({ params }) {
        const { identityNumber, signature } = params 
        
        await Document.query()
                    .where('identity_number', identityNumber)
                    .update({ signature: signature })

        return Document.findBy('identity_number', identityNumber)
    }

    static async createBlockchainHash({ params }) {
        const { identityNumber, blockchain_hash } = params
        const checkValid = await Document.findBy('identity_number', identityNumber)
        if(checkValid['is_broadcasted']) {
            return ErrorFactory.badRequest('Document was broadcasted')
        }

        const broadcasted_document = await Document.query()
                                                .where('identity_number', identityNumber)
                                                .update({ blockchain_hash: blockchain_hash, is_broadcasted: true, signature: "broadcasted into blockchain" })

        return broadcasted_document
    }

    static async getDocType({ params }) {
        const { id } = params
        const res = DocumentType.findBy('id', id)

        if(!res) {
            return ErrorFactory.notFound(`Document with ${id} is not found`)
        }

        return res
    }
}

module.exports = DocumentService 