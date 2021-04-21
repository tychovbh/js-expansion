const express = require('express')
let assert = require('assert')
const app = express()
const port = 3000
require('js-expansion')
const {query, form, request} = require('js-expansion')

app.get('/', (req, res) => {
    const collection = [
        {
            id: 1,
            name: 'Piet',
        },
        {
            id: 2,
            name: 'henry',
            friends: [
                {
                    name: 'Bart',
                },
            ],
        },
    ]

    assert.deepStrictEqual(collection.get('1.friends.0.name'), collection[1].friends[0].name)
    const collection2 = ['admin', 'teacher', 'student']

    assert.deepStrictEqual(collection2.contains(['admin', 'parent']), true)
    assert.deepStrictEqual(collection2.has(['student', 'teacher']), true)
    assert.deepStrictEqual(collection2.contains(['parent']), false)
    assert.deepStrictEqual(collection2.has(['student', 'teacher', 'parent']), false)

    assert.deepStrictEqual(collection.first(), collection[0])
    assert.deepStrictEqual(collection.last(), collection[1])
    assert.deepStrictEqual(collection.findBy('name', 'henry'), collection[1])
    assert.deepStrictEqual(collection.findIndexBy('name', 'henry'), 1)
    assert.deepStrictEqual(collection.sortBy('id', 'desc'), collection.reverse())
    assert.deepStrictEqual(collection.sortBy('id', 'asc'), collection)
    assert.deepStrictEqual(collection.sortBy('name', 'asc'), collection.reverse())
    assert.deepStrictEqual(collection.sortBy('name', 'desc'), collection)
    assert.deepStrictEqual(collection.delete(2, 'id'), [
        {
            id: 1,
            name: 'Piet',
        },
    ])
    assert.deepStrictEqual([1, 2, 3].delete(2), [1, 3])
    assert.deepStrictEqual([1, 2, 3].save(4), [1, 2, 3, 4])
    assert.deepStrictEqual(collection.save({
        id: 3,
        name: 'klaas',
    }), collection)
    assert.deepStrictEqual(collection.save({
        id: 1,
        name: 'klaas',
    }), collection)

    assert.deepStrictEqual([1, 2, 3].save(4), [1, 2, 3, 4])
    assert.deepStrictEqual(['henry', 'piet', 'klaas'].save('klaas'), ['henry', 'piet', 'klaas'])

    const array = ['piet', 'henry']
    assert.strictEqual(array.search('piet'), 'piet')
    assert.deepStrictEqual(array.clone(), array)

    const string = 'piet'
    assert.strictEqual(string.ucfirst(), 'Piet')

    const seconds = 60
    assert.strictEqual(seconds.time(), '01:00')

    const price = 10.50
    assert.strictEqual(price.price('EUR'), '€10.50')
    assert.strictEqual(price.price('EUR', 'nl-NL'), '€ 10,50')


    const formData = form({id: 1})

    assert.strictEqual(query({id: 1, name: 'henry'}), '?id=1&name=henry')
    assert.strictEqual(request('get', '/users/{id}', {id: 1, paginate: 10}), '/users/1?paginate=10')

    res.send('All tests passed!')
})

app.listen(port, () => console.log(`Example app listening on port http://localhost${port}!`))
