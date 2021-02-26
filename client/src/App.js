import React, { useEffect, useState } from 'react'
import {
  Switch, Route, Link, useRouteMatch
} from 'react-router-dom'
import productService from './services/products'

import ProductForm from './components/ProductForm'
import Product from './components/Product'
//import ProductList from './components/ProductList'
import RegisterForm from './components/RegisterForm'
import SearchForm from './components/SearchForm'
//import { set } from 'mongoose'

const App = () => {
  //const { products } = props
  const [products, setProducts] = useState([])
  useEffect(() => {
    productService.getAll().then(p => setProducts(p))
  }, [])

  const match = useRouteMatch('/products/:id')
  const product = match
    ? products.find(p => p.id === match.params.id)
    : null

  const padding = {
    padding: 5
  }

  return (
    <div>
      <div>
        <Link style={padding} to="/">haku</Link>
        <Link style={padding} to="/new">lisää tuote</Link>
        <Link style={padding} to="/register">rekisteröidy</Link>
      </div>

      <h1>Kotitalouden kierrätysavustin</h1>

      <Switch>
        <Route path="/products/:id">
          <Product product={product} />
        </Route>
        <Route path="/new">
          <ProductForm />
        </Route>
        <Route path="/register">
          <RegisterForm />
        </Route>
        <Route path="/">
          {/* <ProductList products={products} /> */}
          <SearchForm products={products} />
        </Route>
      </Switch>
    </div>
  )
}

export default App
