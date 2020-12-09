import BaseRequest from './foundation/BaseRequest'

class ServerRequest extends BaseRequest {
    getURL(url) {
        const baseUrl = process.env.VUE_APP_SERVER_URL
        return baseUrl.concat(url)
    }
    async registerUser(params) {
        const url = this.getURL('/api/user/register-user')
        return this.post(url, params)
    }
    async createSignature(params) {
        const url = this.getURL('/api/user/create-signature')
        return this.post(url, params)
    }

    async storeHash(params) {
        const url = this.getURL('/api/user/store-hash')
        return this.post(url, params)
    }
    
    async getDocumentByCredential(params) {
        const url = this.getURL('/api/user/get-document-credential')
        return this.get(url, params)
    }

    async createDocType(params) {
        const url = this.getURL('/api/user/create-document-type')
        return this.post(url, params)
    }

    async getAllDocType() {
        const url = this.getURL('/api/user/get-all-document-type')
        return this.get(url)
    }

    async createDocument(params) {
        const url = this.getURL('/api/user/create-document')
        return this.post(url, params)
    }

    async getAllDocument() {
        const url = this.getURL('/api/user/get-all-document')
        return this.get(url)
    }

    async getDocumentToString(params) {
        const url = this.getURL('/api/user/get-document-string')
        return this.get(url, params)
    }
    async getDocType(documentTypeID) {
        const url = this.getURL(`/api/user/get-document-type/${documentTypeID}`)
        return this.get(url)
    }
}

const instance = new ServerRequest()
export default instance