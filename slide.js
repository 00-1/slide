// probably use a proper router...
const route = (route) => location.hash = route

// return the next photo after navigation in a direction
const skip = (photos, photo, skip) => (index = photos.indexOf(photo)) > -1 // photo exists...
    && index + skip < photos.length // and navigating won't fall off the end...
    ? index + skip > -1 // navigating won't fall off the start...
        ? photos[index + skip] // return the next photo
        : photos[photos.length - 1] // return the last photo
    : photos[0] // return the first photo

// display a photo
const display = (photo) => {
    // swap the img ids and 
    const next = document.getElementById('next')
    document.getElementById('show').id = 'next'
    next.replaceWith(Object.assign(photo.image, {id: 'show'}))       
}
// given and array of sources returns an array of preloaded images
const preload = (photos) => photos.map(photo => ( { name: photo, image: 
    Object.assign(new Image(), {
        src: `./${photo}.jpg`,
        alt:  photo,
        title: photo,
        onload: () => console.log("load"),
        onerror: () => console.log("error"),
        onclick: () => route(skip(album, album.filter(p=>p.name===location.hash.substring(1))[0], 1).name)
    })
}))

// photo album (could come from an api that lists a folder's contents)
const album = preload(['orange', 'pear', 'pigeon'])

// listen for hash change and page load
onhashchange = onload = () => 
    (hash = location.hash.substring(1)) // check photo in hash exists...
    === (photo = skip(album, album.filter(photo=>photo.name===hash)[0], 0)).name // ...by comparing with skip(,,0)
        ? display(photo)
        : route(photo.name) // if not, navigate to an extant photo