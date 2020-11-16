'use strict'

const Certificate = use('App/Models/Certificate')
const Hash = use('Hash')

class CertificateService {
    static async generate({ params, auth }) {
        const { name, identity, email, type } = params
        const credential = await this.getCredential()
        const generated = await Certificate.create({
            user_id: auth.user.id,
            name,
            identity,
            email,
            diploma_type: type,
            credential_number: credential
        })
        return generated
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

    static async getCertificateToString({ params }) {
        const { email } = params
        const certificate = await Certificate.query()
                                            .select('id', 'user_id', 'name', 'identity', 'diploma_type', 'email', 'credential_number')
                                            .where('email', email)
                                            .fetch()
        console.log("getCertificateToString -> certificate", certificate)
        return JSON.stringify(certificate)
    }

    static async createSignature({ params }) {
        const { email, signature } = params 
        await Certificate.query()
        .where('email', email)
        .update({ signature: signature })

        return Certificate.findBy('email', email)
    }

    static async createBlockchainHash({ params }) {
        const { email, blockchain_hash } = params
        const broadcasted_certificate = await Certificate.query()
        .where('email', email)
        .update({ blockchain_hash: blockchain_hash, is_broadcasted: true, signature: "broadcasted into blockchain" })

        return broadcasted_certificate
    }
}

module.exports = CertificateService