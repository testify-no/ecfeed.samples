const axios = require('axios')
const https = require('https')
const fs = require('fs')

const configurationRequestAdditional = {
    dataSource: 'genNWise',
    constraints: 'NONE'
}

const configurationRequest= {
    model: '7482-5194-2849-1943-2448',    
    method: 'void com.example.test.Demo.typeString(String,String,String,String,String,String,String,String,String,String,String)',
    userData: JSON.stringify(configurationRequestAdditional).replace(/\"/g, "'")
}

const configuration = {
    requestType: 'requestExport',
    template: 'JSON',
    request: JSON.stringify(configurationRequest)
}

axios.get('https://develop-gen.ecfeed.com/testCaseService', {
        params: configuration,
        httpsAgent: new https.Agent({
            cert: fs.readFileSync(`client.pem`),
            key: fs.readFileSync(`key.pem`),
            passphrase: 'changeit',
            rejectUnauthorized: false
        })
    })
    .then( 
        event => { console.log(event.data); }, 
        event => { console.log(event.response.data); } 
    )