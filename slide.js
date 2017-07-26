// probably use a proper router...
const route = (route) => location.hash = route


// NOTE skip should just take a string and use filter instead of indexOf..
// return the next image after navigation in a direction
const skip = (images, image, skip) => (index = images.indexOf(image)) > -1 // image exists...
    && index + skip < images.length // and navigating won't fall off the end...
    ? index + skip > -1 // navigating won't fall off the start...
        ? images[index + skip] // return the next image
        : images[images.length - 1] // return the last image
    : images[0] // return the first image

// given and array of sources returns an array of preloaded images
const preload = (images) => images.map(image => ({ name: image, element:
    Object.assign(new Image(), {
        src: `./${image}.jpg`,
        alt: image,
        title: image,
        // onload: () => console.log("load"),
        // onerror: () => console.log("error"),
        onclick: () => route(skip(album, album.filter(p => p.name === location.hash.substring(1))[0], 1).name)
    })
}))

// image album (could come from an api that lists a folder's contents)
const album = preload(['orange', 'pear', 'pigeon'])

// display an image
const display = (image, next, show) => {
    next.replaceChild(image, next.childNodes[0])
    show.id = next.id
    next.id = 'show'
}

// listen for hash change and page load
onhashchange = onload = () =>
    (hash = location.hash.substring(1)) // check image in hash exists...
        === (image = skip(album, album.filter(image => image.name === hash)[0], 0)).name // ...by comparing with skip(,,0)
        ? display(image.element, document.getElementById('next'), document.getElementById('show')) // if it does, display it
        : route(image.name) // if not, navigate to an extant image