const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const Product = require('../models/product')
const Instruction = require('../models/instruction')
const User = require('../models/user')
const ProductUserRecycleCount = require('../models/productUserRecycleCount');

const productsData = [
  { name: 'Mustamakkarakastike pullo' },
  {
    name: 'Sanomalehti',
  }
]

const clearDatabase = async () => {
  await Product.deleteMany({})
  await Instruction.deleteMany({})
  await User.deleteMany({})
  await ProductUserRecycleCount.deleteMany({})
  console.log("Database reset!")
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}



const getToken = async (props) => {
  const login = await api
    .post('/api/login')
    .send(props)

  return login.body.token
}

const getProducts = async () => {
  const products = await api.get('/api/products')
  return products
}

const addNewProduct = async (newProduct, token) => {
  const result = await api
    .post('/api/products')
    .set('Authorization', `bearer ${token}`)
    .send(newProduct)
  return result
}

const addNewUser = async (newUser) => {
  return await api
      .post('/api/users')
      .send(newUser)
}

const addFavourite = async (productId, token) => {
  const result = await api
    .post('/api/users/products/' + productId)
    .set('Authorization', `bearer ${token}`)
    .set('Content-Type', 'application/json')
    .expect(201)
    .expect('Content-Type', /application\/json/)
  return result
}

const removeFavourite = async (productId, token) => {
  const result = await api
    .put('/api/users/products/' + productId)
    .set('Authorization', `bearer ${token}`)
    .set('Content-Type', 'application/json')
    .expect(201)
    .expect('Content-Type', /application\/json/)
  return result
}


const addInstruction = async (product, token, instruction) => {
  const result = await api.
    post(`/api/products/${product.id}/instructions`)
    .set('Authorization', 'bearer ' + token)
    .set('Content-Type', 'application/json')
    .send(instruction)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  return result
}


const likeInstruction = async (instructionId, token) => {
  const result = await api
    .post('/api/users/likes/' + instructionId)
    .set('Authorization', `bearer ${token}`)
    .set('Content-Type', 'application/json')
    .expect(201)
    .expect('Content-Type', /application\/json/)
  return result
}

const unLikeInstruction = async (instructionId, token) => {
  const result = await api
    .put('/api/users/likes/' + instructionId)
    .set('Authorization', `bearer ${token}`)
    .set('Content-Type', 'application/json')
    .expect(201)
    .expect('Content-Type', /application\/json/)
  return result
}

const disLikeInstruction = async (instructionId, token) => {
  const result = await api
    .post('/api/users/dislikes/' + instructionId)
    .set('Authorization', `bearer ${token}`)
    .set('Content-Type', 'application/json')
    .expect(201)
    .expect('Content-Type', /application\/json/)
  return result
}

const unDisLikeInstruction = async (instructionId, token) => {
  const result = await api
    .put('/api/users/dislikes/' + instructionId)
    .set('Authorization', `bearer ${token}`)
    .set('Content-Type', 'application/json')
    .expect(201)
    .expect('Content-Type', /application\/json/)
  return result
}

const recycleProductOnce = async (productID, token) => {
  const content = {
    "productID": productID,
    "amount": 1
  }
  const result = await api
    .post('/api/recycle/')
    .set('Authorization', `bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(content)
  return result
}

const unrecycleProductOnce = async (productID, token) => {
  const content = {
    productID: productID,
    amount: -1
  }
  const result = await api
    .post('/api/recycle/')
    .set('Authorization', `bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(content)
  return result
}

const recycleProductFreeAmount = async (productID, amount, token) => {
  const content = {
    productID: productID,
    amount: amount
  }
  const result = await api
    .post('/api/recycle/')
    .set('Authorization', `bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(content)
  return result
}

const getProductRecycleStat = async (productID, token) => {
  const result = await api.get('/api/recycle/?productID=' + productID)
    .set('Authorization', `bearer ${token}`);
  return result;
}

module.exports = {
  clearDatabase,
  usersInDb,
  getToken,
  productsData,
  getProducts,
  addInstruction,
  likeInstruction,
  disLikeInstruction,
  unLikeInstruction,
  unDisLikeInstruction,
  addFavourite,
  removeFavourite,
  addNewProduct,
  recycleProductOnce,
  unrecycleProductOnce,
  recycleProductFreeAmount,
  getProductRecycleStat,
  addNewUser
}