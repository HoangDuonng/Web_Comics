import  axios  from 'axios'
// const axios = require('axios')
export default () => {
    return axios.create({
        baseURL: `http://localhost:3000`
    })
}