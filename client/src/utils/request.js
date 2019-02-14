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
    fetch(`http://localhost:3003/api${path}`, options)
        .then(response => response.json().then(json => resolve(json)))
        .catch(e => reject(e))
})


export const requestWithFile = (method,path,data,file) => new Promise((resolve,reject) => {
    const headers = new Headers()
    headers.append('Authorization',`${getToken()}`)
    let formData = new FormData()
    for (let key in data) formData.append(key, data[key])
    formData.append('image', file)
    const options =  {
        method: method,
        body : formData,
        headers: headers
    }
    fetch(`http://localhost:3003/api${path}`, options)
        .then(response => response.json().then(json => resolve(json)))
        .catch(e => reject(e))
})
