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
        return direction === 'desc' ? b[field] - a[field] : a[field] - b[field]
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
    } else if(collection.includes(value)) {
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

module.exports = {
    get
};
