<template>
  <div>
    <home :activeCertificate="true"/>
    <div class="datatable">
      <table>
        <tr>
          <th>{{ "Name" }}</th>
          <th>{{ "Identity Number" }}</th>
          <th>{{ "Address" }}</th>
          <th>{{ "Additional Information" }}</th>
          <th>{{ "Credential Number" }}</th>
          <th class="action">{{ "Action" }}</th>
        </tr>
        <tr v-for="(document, index) in documents" :key="index">
          <td>{{ document.name }}</td>
          <td>{{ document.identity_number }}</td>
          <td>{{ document.address }}</td>
          <td>{{ document.additional_information }}</td>
          <td>{{ document.credential_number }}</td>
          <td class="action">
            <button @click="getDetail(index)">{{ "Detail" }}</button>
          </td>
        </tr>
      </table>
    </div>
    <document-modal v-if="documentModal" :contractAddress="address" @close-modal="close"/>
  </div>
</template>

<script>
import Home from '@/components/roots/Home.vue' 
import DocumentModal from '@/components/modals/DocumentModal.vue'
import ServerRequest from '@/requests/ServerRequest'

export default {
  components: {
    Home,
    DocumentModal
  },
  data() {
    return {
      documents: [],
      documentModal: false,
      address: null
    }
  },
created () {
    ServerRequest.getAllDocument().then(docs => {
      docs.forEach(docs => {
        if(docs.is_broadcasted) {
          this.documents.push(docs)
        }
      })
    })
  },
  methods: {
    getDetail(index) {
      this.address = this.documents[index].blockchain_hash
      this.documentModal = true
    },
    close() {
      this.documentModal = false
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.datatable {
  margin-top: 95px;
}
table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

th {
  text-align: center;
  color: #D5DDE5;
  background: #333333;
  font-size: 15px;
  font-weight: 600;
  padding: 20px;
}
td {
  vertical-align: middle;
  font-size: 13px;
  text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
.action {
  padding-right: 30px;
}
button {
  background: #000000;
  width: 100px;
  border: 0;
  padding: 13px;
  color: #FFFFFF;
  font-size: 13px;
  border-radius: 3px;
  height: 40px;
  position: relative;
  cursor: pointer;
}
button.disable {
  background: #625D5D;
}
</style>
