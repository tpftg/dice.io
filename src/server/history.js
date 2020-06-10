// History

function History(maxLength) {
  this._maxLength = maxLength
  this.clear()
}

History.prototype.clear = function () {
  this._items = []
}

History.prototype.get = function (length) {
  return (length > 0) ? this._items.slice(-length) : this._items
}

History.prototype.push = function (item) {
  if (this._items.length >= this._maxLength) {
    this._items.shift()
  }

  return this._items.push(item)
}

exports = module.exports = History
