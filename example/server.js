const express = require('express')
let assert = require('assert')
const app = express()
const port = 3000
require('js-expansion')

app.get('/', (req, res) => {
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

    assert.deepStrictEqual(collection.first(), collection[0]);
    assert.deepStrictEqual(collection.last(), collection[1]);
    assert.deepStrictEqual(collection.findBy('name', 'henry'), collection[1]);
    assert.deepStrictEqual(collection.findIndexBy('name', 'henry'), 1);
    assert.deepStrictEqual(collection.delete('id', 2), [
        {
            id: 1,
            name: 'Piet'
        }
    ]);
    assert.deepStrictEqual(collection.save({
        id: 3,
        name: 'klaas'
    }), collection);
    assert.deepStrictEqual(collection.save({
        id: 1,
        name: 'klaas'
    }), collection);

    const array = ['piet', 'henry']
    assert.equal(array.search('piet'), 'piet')
    assert.deepStrictEqual(array.clone(), array)

    const string = 'piet'
    assert.equal(string.ucfirst(), 'Piet')

    const seconds = 60
    assert.equal(seconds.time(), '01:00')

    res.send('Hello World!')
})

app.listen(port, () => console.log(`Example app listening on port http://localhost${port}!`))
