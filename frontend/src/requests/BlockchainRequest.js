import BaseRequest from './foundation/BaseRequest'

class BlockchainRequest extends BaseRequest {
    getURL(url) {
        const baseUrl = process.env.VUE_APP_BLOCKCHAIN_URL
        return baseUrl.concat(url)
    }
    async generateKey() {
        const url = this.getURL('/api/init-account')
        return this.get(url)
    }
    async signDocument(params) {
        const url = this.getURL('/api/sign-data')
        return this.post(url, params)
    }
    async authenticateDocument(params) {
        const url = this.getURL('/api/authenticate-data')
        return this.post(url, params)
    }
    
    async broadcastDocument(params) {
        const url = this.getURL('/api/broadcast-document')
        return this.post(url, params)
    }

    async getContractDetail(params) {
        const url = this.getURL('/api/get-contract-detail')
        return this.post(url, params)
    }
}

const instance = new BlockchainRequest()
export default instance