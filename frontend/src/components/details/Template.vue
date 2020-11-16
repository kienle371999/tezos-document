<template>
  <div>
    <home :activeTemplate="true"/>
    <div class="info">
      <div class="form" v-for="(documentType, index) in documentTypes" :key="index">
        <h1>{{ documentType.document_type }}</h1>
        <form class="template-form">
          <ul v-for="(attribute, index) in convertToArray(documentType.list_attribute)" :key="index">
              <li>{{ attribute }}</li>
          </ul>
          <button type="button" @click="choose(index)">{{ "Choose" }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Home from '@/components/roots/Home.vue'
import ServerRequest from '@/requests/ServerRequest'

export default {
  components: {
    Home
  },
  data() {
    return {
      documentTypes: []
    }
  },
  created () {
      ServerRequest.getAllDocType().then(documents => {
        documents.forEach(document => {
          this.documentTypes.push(document)
        })
      })
  },
  methods: {
    async submit() {
      if (!this.document) {
        window.EventBus.$emit('ERROR', 'Empty document')
        return
      }
      const result = await ServerRequest.createDocType({
          documentType: this.document,
          listAttribute: JSON.stringify(this.listAttribute)
      })
      
      if(result) {
        window.EventBus.$emit('SUCCESS', 'Success')
      }
    },
    addElement() {
      this.indexes++
      this.getAdditionalDisabled = false
    },
    convertCamel(text) {
      const newText = text.replace(/[A-Z]/g, item => item.toLowerCase()) 
      const updatedText = newText.replace(' ','_')
      
      return updatedText
    },
    convertToArray(list) {
      return JSON.parse(list)
    },
    choose(index) {
      localStorage.setItem('enableTemplate', JSON.stringify(this.documentTypes[index]))
      window.EventBus.$emit('SUCCESS', 'Success')
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  color: #000000;
  margin-bottom: 15px;
}
span {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #000000;
  display: flex;
  margin-top: 25px;;
  margin-bottom: 25px;
  font-weight: bold;
}
.login {
  font-family: Arial, Helvetica, sans-serif;
  position: fixed;
  top: 0%;
  left: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  background: #051926;
}
.form {
    position: relative;
    display: inline-block;
    z-index: 1;
    background: #FFFFFF;
    width: 350px;
    margin: 95px auto auto auto;
    padding: 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    margin-right: 35px;
  }
  .form input {
    font-size: 15px;
    color: #000000;
    border-radius: 3px;
    padding: 12px 15px;
    margin-bottom: 10px;
    background-color: #f3f4f5;
    border: solid 1px rgba(3,21,50,0.13);
    box-sizing: border-box;
    width: 50%;
    display: block;
  }
  .form input.disable {
    background-color: #625D5D;
  }
  .form button {
    background: #000000;
    width: 150px;
    border: 0;
    padding: 15px;
    color: #FFFFFF;
    font-size: 17px;
    border-radius: 3px;
    position: relative;
    cursor: pointer;
  }
  li {
    text-align: initial;
    color: #000000;
  }
</style>
