<template>
  <div v-if="dataReady">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">{{ "Certificate Detail" }}</div>
            <div class="modal-body">
              <label>{{ "Name" }}</label>
              <input type="text" :value="data.name" :disabled="true" class="name"/>
              <label>{{ "Identity Number" }}</label>
              <input type="text" :value="data.identity_number" :disabled="true" class="student-id"/>
               <label>{{ "Address" }}</label>
              <input type="text" :value="data.address" :disabled="true" class="address"/>
               <label>{{ "Additional Information" }}</label>
              <input type="text" :value="data.additional_information" :disabled="true" class="student-id"/>
              <label>{{ "Document Type" }}</label>
              <input type="text" :value="data.document_type" :disabled="true" class="document-type"/>
              <label>{{ "Signature" }}</label>
              <textarea type="text" rows="3" :value="data.signature" :disabled="true" class="signature"/>
              <label>{{ "Contract Hash" }}</label>
              <a :href="blockchainDirectory" target="_blank">
              <input type="text" :value="data.blockchain_hash" :disabled="true" class="contract-hash"/>
              </a>
            </div> 
            <div class="modal-footer">
              <button class="submit" @click="submit">{{ "Authenticate Signature" }}</button>
              <button class="close" @click="close">{{ "Close" }}</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import BlockchainRequest from '@/requests/BlockchainRequest'

export default {
  data() {
    return {
      data: {},
      blockchainDirectory: null,
      authenSign: false,
      dataReady: false
    }
  },
  props: {
    credentialNumber: {
      type: String,
      required: true
    },
    document: {
      type: Array,
      required: true
    },
  },
  async created() {
    const document = this.document
    console.log("created -> document", document)
    const serverRes = await BlockchainRequest.getContractDetail({ contractAddress: document[0].blockchain_hash })
    console.log("created -> serverRes", serverRes)
    Object.assign(this.data, document[0], { 'signature': serverRes['value']['0@map']['Signature'] })
    const baseURL = process.env.VUE_APP_TEZOS_URL
    const url = baseURL.concat(document[0].blockchain_hash)
    this.blockchainDirectory = url
    this.dataReady = true
  },
  methods: {
    submit() {
      this.$emit('change-modal', this.data.signature, this.data.identity_number)
    },
    close() {
      this.$emit('close-modal')
    }
  },
}
</script>

<style scoped>
.modal-mask {
  font-family: Arial, Helvetica, sans-serif;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 50%;
  margin: 0px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-header {
  font-size: 18px;
  font-weight: 600;
  text-align: left;
  color: #000000;
}
.modal-body {
  margin: 20px 0;
}
.modal-body label {
  float: left;
  margin-top: 12px;
  font-size: 15px;
  color: #000000;
}
.modal-body input {
  display: block;
  font-size: 15px;
  color: #000000;
  border-radius: 3px;
  padding: 12px 15px;
  margin-left: 160px;
  margin-bottom: 10px;
  background-color: #f3f4f5;
  border: solid 1px rgba(3,21,50,0.13);
  background: #999999;
  box-sizing: border-box;
  width: 78%;
}
.modal-body textarea {
  font-family: Arial, Helvetica, sans-serif;
  display: block;
  font-size: 15px;
  color: #000000;
  border-radius: 3px;
  padding: 12px 15px;
  margin-left: 160px;
  margin-bottom: 10px;
  background-color: #f3f4f5;
  border: solid 1px rgba(3,21,50,0.13);
  background: #999999;
  box-sizing: border-box;
  resize: none;
  width: 78%;
}
.modal-body .contract-hash {
  cursor: pointer;
  color: #ff0000;
}
.modal-body a {
  text-decoration: none;
}
.modal-footer {
  display: flex;
}
.modal-footer button.submit {
  background: #000000;
  width: 30%;
  border: 0;
  padding: 13px;
  color: #FFFFFF;
  font-size: 15px;
  border-radius: 3px;
  margin-left: auto;
  margin-right: 0;
  cursor: pointer; 
}
.modal-footer button.close {
  background: #000000;
  width: 18%;
  border: 0;
  padding: 13px;
  color: #FFFFFF;
  font-size: 15px;
  border-radius: 3px;
  margin-right: 50px;
  cursor: pointer; 
  margin-left: 5px;
}
</style>