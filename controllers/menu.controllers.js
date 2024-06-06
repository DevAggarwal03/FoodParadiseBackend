const Dish = require('../modles/Dish.models')
const Review = require('../modles/Review.modles')

exports.getMenu = async(req, res) => {
    try {
        const menu = await Dish.find({});

        if(!menu){
            return res.status(404).json({
                success: false,
                message: 'no dishes found',
            })
        }


        return res.status(200).json({
            success: true,
            message: 'dishes found',
            response: menu,
        })

        
    } catch (error) {
        console.log(`error while fething all the dishes: ${error}`)
        res.status(500).json({
            success: false,
            message: 'error while fetching dishes',
            error: error
        })
    }

}

exports.getDish = async(req, res) => {
    try {
        const {id} = req.params

        const response = await Dish.findById({_id: id});

        if(!response){
            return res.status(404).json({
                success: false,
                message: 'no dish found of that id',
            })
        }

        return res.status(200).json({
            success: true,
            response: response,
            message: 'dish retrieved',
        })


    } catch (error) {
        console.log(`error occourde while fetching the dish: ${error}`)
        res.status(500).json({
            success: false,
            message: 'error occoured while fetching the dish',
            error: error,
        })
    }
}

exports.getReviews = async(req, res) => {
    try {
        
        const allReviews = await Review.find({});
        if(!allReviews){
            return res.status(404).json({
                success: false,
                message: "no review to post",
            })
        }
        return res.status(200).json({
            success: true,
            response: allReviews,
            message: 'all reviews fetched'
        })

    } catch (error) {
        console.log(`error occoured while fetching reviews: ${error}`);
        res.status(400).json({
            success: false,
            message: `error occoured while fetching reviews: ${error}`
        })
    }
}


exports.addReview = async(req, res) => {
    try {
        
        const {name, comment} = req.body;

        if(name === "" || !name || comment === "" || !comment){
            return res.status(500).json({
                success: false,
                message: `no comments/name passed`
            })
        }

        const postingReview = await Review.create({name, comment})

        return res.status(200).json({
            success: true,
            response: postingReview,
            message: 'review posted'
        })

    } catch (error) {
        console.log(`error occoured while posting a review: ${error}`);
        res.status(400).json({
            success: false,
            message: `error occoured while posting a review: ${error}`
        })
    }
}