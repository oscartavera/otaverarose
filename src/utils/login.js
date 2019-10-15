const axios = require('axios')
const login =  function(formData){
    return new Promise((resolve, reject)=>{
    let url = 'http://localhost:3000/0.1/auth/login';
        axios.post(url, formData).then(response=>{
            resolve(response);
        }).catch(error=>{
            reject(error);
        })
    });
}
  /*try{
    request({
        url: url,
        method: "POST",
        headers: { "content-type": "application/json",},
        json: formData
        }, function (error, resp, body) {
            if( error ){
                return callback('No se pudo procesar la peticion','')
            }
            if(resp.statusCode == 200){
                return callback('', body)
            }else{
                return callback({status:resp.statusCode,message:"login UnSuccesful"}, false)
            }
        })
    }catch(e){
        return callback(e,'')
    }*/

module.exports = login