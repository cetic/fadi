module.exports = {
    generateID: function(length) {
      let result = ''
      let characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let charactersLegth = characters.length
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLegth))
      }
      return result
    },
   
    generateEmail: function() {
      let values = 'abcdefgh123456789'
      let email = ''
      let temp
      for (let i = 0; i < 10; i++) {
        temp = values.charAt(Math.round(values.length * Math.random()))
        email += temp
      }
      temp = ''
      email += '@'
      for (let i = 0; i < 8; i++) {
        temp = values.charAt(Math.round(values.length * Math.random()))
        email += temp
      }
      email += '.com'
      return email
    },
   
    generateNumbers: function() {
      let numbers = Math.floor(Math.random() * 9000000000) + 100000000
      return numbers.toString()
    },
  }