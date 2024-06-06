const Dish = require('../modles/Dish.models')
const cloudinary = require('cloudinary').v2
const cloudinaryConnect = require('../config/cloudinary')
cloudinaryConnect();


const uploadFileToCloudinary = async (file, folder) => {
    const options = {folder};
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}

const isAllowedType = (fileType, allowedFileTypes)=>{
    return allowedFileTypes.includes(fileType);
}


exports.addDish = async(req, res) => {
    try {
        
        const {name, description, price} = req.body
        
        const image = req.files.file

        const supportedFileTypes = ["png", "jpg", "jpeg"];
        const fileType = image.name.split('.')[1];

        if(!isAllowedType(fileType, supportedFileTypes)){
            return res.status(500).json({
                success: false,
                message: 'file type not supported'
            })
        }

        const response = await uploadFileToCloudinary(image, "Restaurant-devcomm");

        const newAddedDish = await Dish.create({
            name,
            image: response.secure_url,
            description,
            price,
        });


        res.status(200).json({
            success: true,
            message: "data base entry done",
            response: response
        })

    } catch (error) {
        console.log(`error occoured while add a dish: ${error}`)
        res.status(500).json({
            success: false,
            message: 'error while add a dish',
            error: error,
        })
    }
}