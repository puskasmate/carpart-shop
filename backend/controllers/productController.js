import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProducts = asyncHandler(async(req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page -1))

    res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Termék nem található!')
    }
})

const deleteProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        await product.remove()
        res.json({
            message: 'Termék sikeresen törölve!'
        })
    } else {
        res.status(404)
        throw new Error('Termék nem található!')
    }
})

const createProduct = asyncHandler(async(req, res) => {
    const product = new Product({
        name: 'Példa név',
        price: 0,
        user: req.user._id,
        image: '/images/pelda.jpg',
        brand: 'Példa márka',
        category: 'Példa kategória',
        subcategory: 'Példa alkategória',
        model: 'Példa model',
        year: 2001,
        countInStock: 0,
        numReviews: 0,
        description: 'Példa leírás'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler(async(req, res) => {
    const { name, price, description, image, brand, category, subcategory, model, countInStock, year } = req.body
    
    const product = await Product.findById(req.params.id)

    if(product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.category = category
        product.subcategory = subcategory
        product.brand = brand
        product.model = model
        product.countInStock = countInStock
        product.year = year

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Termék nem található!')
    }

    
})

const updateProductQty = asyncHandler(async(req, res) => {
    console.log("ASD")
    console.log(req.body)
    console.log("ASD")

    const { qty } = req.body
    const productt = await Product.findById(req.params.id)

    if(productt) {
        productt.countInStock = productt.countInStock - qty

        const updatedProduct = await productt.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        console.log(req.body)
        throw new Error('Termék nem található!')
    }

    
})

const createReview = asyncHandler(async(req, res) => {
    const { rating, comment } = req.body
    
    const product = await Product.findById(req.params.id)

    if(product) {
        const alreadyReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString())

        if(alreadyReviewed) {
            res.status(400)
            throw new Error('A termékhez már alkotott véleményt!')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
        
        await product.save()
        res.status(201).json({ message: 'Vélemény megalkotva! Köszönjük visszajelzését!'})
    } else {
        res.status(404)
        throw new Error('Termék nem található!')
    }

    
})

const getTopProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)

    res.json(products)
})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createReview,
    getTopProducts,
    updateProductQty
}