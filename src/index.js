const FormData = require('form-data')
const qs = require('qs')
const Cookies = require('js-cookie')

if (typeof HTMLElement !== 'undefined') {
    HTMLElement.prototype.hasClass = function (cls) {
        return this.classList.contains(cls)
    }

    Element.prototype.appendBefore = function (element) {
        element.parentNode.insertBefore(this, element)
    }

    Element.prototype.appendAfter = function (element) {
        element.parentNode.insertBefore(this, element.nextSibling)
    }

}

Number.prototype.time = function () {
    let h = Math.floor(this / 3600)
    let m = Math.floor(this % 3600 / 60)
    let s = Math.floor(this % 3600 % 60)
    return ((h > 0 ? h + ':' : '') + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s)
}

Number.prototype.price = function (currency = 'USD', locale = 'en-US') {
    if (typeof Intl !== 'object' || typeof Intl.NumberFormat !== 'function') {
        return this
    }

    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
    })

    return formatter.format(this)
}

Array.prototype.contains = function (array) {
    for (let i in array) {
        if (array.hasOwnProperty(i) && this.includes(array[i])) {
            return true
        }
    }

    return false
}
Array.prototype.has = function (array) {
    for (let i in array) {
        if (array.hasOwnProperty(i) && !this.includes(array[i])) {
            return false
        }
    }

    return true
}

Array.prototype.first = function () {
    return this[0] || {}
}

Array.prototype.last = function () {
    return this[this.length - 1] || {}
}

Array.prototype.findBy = function (key, value) {
    return this.find((item) => {
        return item[key] === value
    }) || {}
}

Array.prototype.findIndexBy = function (key, value) {
    return this.findIndex(item => item[key] === value)
}

Array.prototype.search = function (name) {
    return this.find((element) => element === name)
}

Array.prototype.clone = function () {
    return this.slice(0)
}

Array.prototype.sortBy = function (field, direction) {
    return this.sort(function (a, b) {
        if (!isNaN(a[field]) && !isNaN(b[field])) {
            return direction === 'desc' ? b[field] - a[field] : a[field] - b[field]
        }


        if (direction === 'desc') {
            return a[field] > b[field] ? -1 : 1
        }

        return a[field] < b[field] ? -1 : 1
    })
}

Array.prototype.save = function (value, key = 'id') {
    let update = false
    let collection = this

    if (typeof value === 'object') {
        for (let i in collection) {
            if (value[key] === collection[i][key]) {
                collection[i] = value
                update = true
                break
            }
        }
    } else if (collection.includes(value)) {
        update = true
    }

    if (!update) {
        collection.push(value)
    }

    return collection
}

Array.prototype.delete = function (value, key = '') {
    return this.filter((item) => {
        if (key !== '') {
            return item[key] !== value
        }

        return item !== value
    })
}


function get(data, key) {
    if (typeof key === 'string') {
        key = key.split('.')
    }

    const name = key.shift()

    if (!data[name] || data[name] === undefined) {
        return false
    }

    data = data[name]

    if (!key.length) {
        return data
    }

    return get(data, key)
}

Array.prototype.get = function (key) {
    return get(this, key)
}

String.prototype.ucfirst = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

const createForm = (formData, params, key = null) => {
    for (let i in params) {
        if (!params.hasOwnProperty(i)) {
            continue
        }

        let formKey = key ? key + `[${i}]` : i

        if (Array.isArray(params[i]) && !params[i].length) {
            formData.append(formKey, params[i])
            continue
        }

        if (
            params[i] !== null &&
            (Array.isArray(params[i]) || typeof params[i] === 'object') &&
            !(params[i] instanceof File || params[i] instanceof Date)
        ) {
            formData = createForm(formData, params[i], formKey)
            continue
        }

        // Return null values as empty string, because the back-end will receive a string "null" which is super annoying.
        formData.append(formKey, params[i] === null ? '' : params[i])
    }

    return formData
}

function form(params) {
    let formData = new FormData()
    return createForm(formData, params)
}

function query(filters) {
    return filters && JSON.stringify(filters) !== '{}' ? '?' + qs.stringify(filters) : ''
}

function request(type, route, params = {}) {
    params = Object.assign({}, params) || {}

    for (let key in params) {
        if (!params.hasOwnProperty(key) || route.indexOf(`{${key}}`) === -1) {
            continue
        }
        route = route.replace(`{${key}}`, params[key])
        delete params[key]
    }

    return ['get', 'delete'].includes(type) ? route + query(params) : route
}

class Cookie {
    write(key, value, options = {}) {
        if (this.res) {
            this.res.cookie(key, value, options)
            return this
        }

        Cookies.set(key, value, options)
        return this
    }

    read(key) {
        return this.req ? this.req.cookies[key] : Cookies.get(key)
    }

    clear(key) {
        this.res ? this.res.clearCookie(key) : Cookies.remove(key)
        return this
    }

    withExpress(req, res) {
        this.req = req
        this.res = res

        return this
    }
}

class CookieFactory {
    static withExpress(req, res) {
        return new Cookie().withExpress(req, res)
    }

    static write(key, value, options) {
        return new Cookie().write(key, value, options)
    }

    static read(key) {
        return new Cookie().read(key)
    }

    static clear(key) {
        return new Cookie().clear(key)
    }
}

module.exports = {
    get,
    form,
    query,
    request,
    Cookies: CookieFactory
}
