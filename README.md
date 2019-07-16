# js-expansion

> Javascript Expansion

[![NPM](https://img.shields.io/npm/v/js-expansion.svg)](https://www.npmjs.com/package/js-expansion) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


Package to expand default Javascript types like, Array, Number and String

## Install

```bash
npm install --save js-expansion
```

## Usage

```jsx
require('js-expansion')

/* Nested Array */
const collection = [
    {
        id: 1,
        name: 'Piet'
    },
    {
        id: 2,
        name: 'henry'
    },
]

// Get first element from Array
const firstElement = collection.first()

// Get last element from Array
const lastElement = collection.last()

// Search objects in array on key => value
const foundElement = collection.findBy('name', 'henry')

// Search object index in array on key => value
const indexElement = collection.findIndexBy('name', 'henry')

// Delete element from arrat
const deleteCollection = collection.delete('id', 2)

// Add new element to the Array
const addCollection = collection.save({
    id: 3,
    name: 'klaas'
})

// Update existing element in the array (default updates on key `id`)
const updateCollection = collection.save({
    id: 1,
    name: 'klaas'
})

// Update existing element in the array by custom key
const updateCollection = collection.save({
    name: 'klaas',
    age: 10
}, 'name')

/* Normal Array methods */
const array = ['piet', 'henry']

// Search Array
const searchResult = array.search('piet')

// Clone Array
const clonedArray = array.clone()

/* String methods */
const string = 'piet'

// Capitalize string
const capitalized = string.ucfirst()

/* Number methods */ 
const seconds = 60

// Convert seconds to time: 00:00
seconds.time()
```

## Tests
```bash
cd example
yarn install
yarn start
```


## License

MIT © [tychovbh](https://github.com/tychovbh)
