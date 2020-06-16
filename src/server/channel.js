// Server channel

function isValid(channel) {
  // At least three lowercase alphanumeric characters
  return (channel !== undefined) && /^([a-z0-9]{3,})$/.test(channel)
}

function resolve(data, fallback) {
  // Fallback to default channel if undefined or invalid
  return isValid(data.channel) ? data.channel : fallback
}

exports.isValid = isValid

exports.resolve = resolve
