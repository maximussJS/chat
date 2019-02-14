import {getToken} from './auth'


export const request = (method,path,data) => new Promise((resolve,reject) => {
    const headers = new Headers()
    headers.append('Authorization',`${getToken()}`)
    headers.append('Content-Type', 'application/json')
    const options = data ? {
        method: method,
        body: JSON.stringify(data),
        headers: headers
    } : {
        method: method,
        headers: headers
    }
    fetch(`http://localhost:3001/api${path}`, options)
        .then(response => response.json().then(json => resolve(json)))
        .catch(e => reject(e))
})


export const requestFile = (method,path,file) => new Promise((resolve,reject) => {
    const headers = new Headers()
    headers.append('Authorization',`${getToken()}`)
    let formData = new FormData()
    formData.append('file', file)
    const options =  {
        method: method,
        body : formData,
        headers: headers
    }
    fetch(`http://localhost:3001/api${path}`, options)
        .then(response => response.json().then(json => resolve(json)))
        .catch(e => reject(e))
})
