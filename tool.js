var e = function(selector) {
    return document.querySelector(selector)
}

var log = function() {
    console.log.apply(console, arguments)
}

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

var es = function(selector) {
    return document.querySelectorAll(selector)
}

var appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)

}

var taggleClass = function(selector, className) {
    if(selector.classList.contains(className)) {
        selector.classList.remove(className)
    } else {
        selector.classList.add(className)
    }
}

var bindAll = function(selector, eventName, callback) {
    var elements = es(selector)
    for(var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}