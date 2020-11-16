<template>
  <div>
    <home :activeCreateTemplate="true"/>
    <div class="info">
      <div class="form">
        <h1>{{ "Template" }}</h1>
        <form class="info-form">
          <div>
            <span>{{ "Type of Document" }}</span>
            <input type="text" v-model="document" placeholder="Document Type"/>
          </div>
          <span>{{ "Attribute" }}</span>
          
          <div class="first-element" v-for="index in indexes" :key="index">
            <input type="text" :class="{ disable: getDisabled }" v-model="listAttribute[index - 1]" :disabled="getDisabled"/>
          </div>
          <div class="lastElement">
            <input class="last-input" type="text" :class="{ disable: getAdditionalDisabled }" v-model="listAttribute[indexes]" :disable="getAdditionalDisabled"/>
            <button type="button" class="add-element" @click="addElement()">&#43;</button>
          </div>
          <button type="button" @click="submit()">{{ "Submit" }}</button>
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
      document: null,
      getDisabled: true,
      indexes: 2,
      getAdditionalDisabled: true,
      getClassDisable: true,
      listAttribute: ['Name', 'Identity Number', 'Address'],
    }
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
        this.indexes = 2
        this.getAdditionalDisabled = true
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
    width: 700px;
    margin: 95px auto auto auto;
    padding: 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
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
  .form .add-element {
    padding: inherit;
    margin-left: 15px;
    border-radius: 50%;
    width: 45px;
    height: 45px;

  }
  .lastElement {
    display: flex;
    margin-bottom: 20px;
    .last-input {
      margin-left: 0px;
      display: inline-block !important;
    }
  }
  li {
    background-color: #000000;
  }
  li.background {
    background-color: #000000;
  }
</style>
