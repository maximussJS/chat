const util = require('util')
const cloudinary = require('cloudinary').v2


cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET
})

const UploadPhoto = util.promisify(cloudinary.uploader.upload)

const imageToBase64 = photo => {
    if (photo) {
        const prefix = 'data:image/png;base64,'
        const imageBufferBase64 = Buffer.from(photo.data).toString('base64')
        return prefix + imageBufferBase64
    }
    else throw Error('Required parameter "photo" not found!')
}

module.exports = photo => new Promise(async (resolve,reject) => {
    try {
        const normalizedPhoto = imageToBase64(photo)
        const result = await UploadPhoto(normalizedPhoto, {
            use_filename : true
        })
        result && result.secure_url ? resolve(result.secure_url) : reject('Cannot upload photo')
    }
    catch (error) {
        console.error('Error uploading photo: ', error)
        reject(error)
    }
})
