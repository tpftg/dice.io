// dom.js

// Convert value to string
export function str(v) {
  return v + ''
}

// Query selector shortcut
export function el(s) {
  return document.querySelector(s)
}

// Adds single class value to element
export function addOneClass(e, c) {
  if (e.classList) {
    e.classList.add(c)
  } else {
    if (e.className.split(' ').indexOf(c) == -1) {
      e.className += ' ' + c
    }
  }

  return e
}

// Adds class values to element
export function addClass(e, c) {
  str(c).split(' ').forEach((i) => {
    e = addOneClass(e, i)
  })

  return e
}

// Remove single class value from element
export function removeClass(e, c) {
  if (e.classList) {
    e.classList.remove(c)
  } else {
    e.className = e.className.replace(
      new RegExp("\\b" + c + "\\b", 'g'),
      ''
    )
  }

  return e
}

// Toggle single class value from element
export function toggleClass(e, c) {
  if (e.classList) {
    e.classList.toggle(c)
  } else {
    let arr = e.className.split(' ')
    let i = arr.indexOf(c)

    if (i >= 0) {
      arr.splice(i, 1)
    } else {
      arr.push(c)
    }

    e.className = arr.join(" ")
  }

  return e
}

// Get or add single element attribute value
export function attr(e, n, v = undefined) {
  if (v === undefined) {
    return e.getAttribute(n)
  }

  // Add "no value" attribute if value is null
  if (v === null) {
    e.setAttributeNode(document.createAttribute(n))
  } else {
    e.setAttribute(n, v)
  }

  return e
}

// Make an element
export function make(n, o = {}) {
  let e = document.createElement(n)

  if (o.class) {
    e = addClass(e, o.class)
  }

  if (o.text) {
    e.innerText = o.text
  }

  if (o.attr && typeof o.attr === 'object') {
    for (const k in o.attr) {
      attr(e, k, o.attr[k])
    }
  }

  if (o.html) {
    e.innerHTML = o.html
  }

  return e
}
