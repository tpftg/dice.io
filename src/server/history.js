// History

function History(maxLength) {
  this._expireAt = false
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

History.prototype.expireIn = function (milliseconds) {
  this._expireAt = Date.now() + milliseconds

  return this
}

History.prototype.expired = function () {
  return this._expireAt && Date.now() >= this._expireAt
}

exports = module.exports = History
