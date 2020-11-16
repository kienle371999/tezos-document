<template>
  <div>
    <home :activeInfo="true"/>
    <div class="info">
      <div class="form">
        <h1>{{ document.document_type }}</h1>
         <form class="info-form">
          <div v-for="(attribute, index) in convertToArray(document.list_attribute)" :key="index">
            <input type="text" v-model="documentParam[index]" :placeholder="attribute"/>
          </div>
          <button type="button" @click="submit()" :disable="getDisabled">{{ "Submit" }}</button>
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
  created () {
    const template = localStorage.getItem('enableTemplate')
    this.document = JSON.parse(template)
  },
  data() {
    return {
      document: null,
      documentParam: [],
      getDisabled: false
    }
  },
  methods: {
    async submit() {
      const listAttrribute = this.convertToArray(this.document.list_attribute)
      for (const index in listAttrribute) {
        if (!this.documentParam[index]) {
          window.EventBus.$emit('ERROR', `Empty ${listAttrribute[index]}`)
          this.getDisabled = true
          this.disable()
          return
        }
      }
      
      const res = await ServerRequest.createDocument({
        id: this.document.id,
        name: this.documentParam[0],
        identityNumber: this.documentParam[1],
        address: this.documentParam[2],
        additionalInfo: this.convertAddtionalInfo(3, listAttrribute)
      })

      if(res) {
        window.EventBus.$emit('SUCCESS', 'Success')
        this.refresh()
      }
    },
    validEmail (email) {
      var re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
      return re.test(email)
    },
    disable() {
      setTimeout(() => {
        this.getDisabled = window.EventBus.$data.disable
      }, 2500);
    },
    refresh() {
      this.documentParam = []
    },
    convertCamel(text) {
      const newText = text.replace(/[A-Z]/g, item => item.toLowerCase()) 
      const updatedText = newText.replace(' ','_')
      
      return updatedText
    },
    convertToArray(list) {
      return JSON.parse(list)
    },
    convertAddtionalInfo(index, data) {
      let parameter = {}
      for (var i = index; i < data.length; i++) {
        Object.assign(parameter, {
         [this.convertCamel(data[i])]: this.documentParam[i]
        })
      }
      return JSON.stringify(parameter)
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
    width: 360px;
    margin: 95px auto auto auto;
    padding: 70px;
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
    width: 100%;
  }
  .form button {
    background: #000000;
    width: 100%;
    border: 0;
    padding: 15px;
    color: #FFFFFF;
    font-size: 17px;
    border-radius: 3px;
    position: relative;
    cursor: pointer;
  }
  li {
    background-color: #000000;
  }
  li.background {
    background-color: #000000;
  }
</style>
