const axios = require('axios')
const register =  function(formData){
    return new Promise((resolve, reject)=>{
    let url = 'http://localhost:3000/0.1/auth/com/10';
        axios.post(url, formData).then(response=>{
            resolve(response);
        }).catch(error=>{
            reject(error);
        })
    });
}
module.exports = companyregister