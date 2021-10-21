import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({})
    res.json(products)
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

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
}