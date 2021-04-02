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
        name: 'henry',
        friends: [
            {
                id: 3,
                name: 'Karel',
            }   
        ]
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

// Get value from array by dot notation: Karel
const friend_name = collection.get('1.friends.0.name')

// Sort array by object key (direction desc)
const sortedCollection = collection.sortBy('id', 'desc')

// default direction asc
const sortedCollection = collection.sortBy('id') 

// Delete element from array
const deleteCollection = collection.delete(2)

// Delete element from array with objects
const deleteCollection = collection.delete(2, 'id')

// Add new element to the Array if the value is already present in the collection is does not adds it again.
const addCollection = collection.save(1)

// Add new element to the Array with objects
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

const price = 10.50

// Convert number/float price into label: € 10,50
price.price('EUR', 'nl-NL')
```

## Tests
```bash
cd example
yarn install
yarn start
```


## License

MIT © [tychovbh](https://github.com/tychovbh)
