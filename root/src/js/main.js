require("waypoints/lib/noframework.waypoints.min");

var qsa = function(s, doc) { 
    if (!!doc)
        return Array.prototype.slice.call(doc.querySelectorAll(s));
    else
        return Array.prototype.slice.call(document.querySelectorAll(s));
};
var scrollingSections = qsa(".scrolling-section");
var scrollyBackgrounds = qsa(".scrolly-image");
var indexedBackgrounds = [];

// Parse the scrolly backgrounds into an indexed object
scrollyBackgrounds.forEach(function(img, i) {
    var index = parseInt(img.getAttribute("data-index"));
    if (index !== undefined)
    indexedBackgrounds[index] = img;
});

// Hook up scrolling events and show/hide appropriate background by index
scrollingSections.map(section => {
    return new Waypoint({
        element: section,
        offset: '100%',
        handler: (direction) => {
            scrollSection(section, direction);
        }
    })
});

function scrollSection(section, direction) {
    var ix = parseInt(section.getAttribute("data-index"));
    var img = indexedBackgrounds[ix];
    var prevImg = indexedBackgrounds[ix-1];

    if (!img)
        return;
    
    if (direction == 'down') {
        img.classList.add("is-visible");
        prevImg?.classList.remove("is-visible");
    } else if (direction == 'up') {
        img.classList.remove("is-visible");
        prevImg?.classList.add("is-visible");
    }
}

// Add "fade-into-view" or "slide-into-view" to apply their on-scroll effects.
var fadeInItems = qsa(".fade-into-view");
var slideInItems = qsa(".slide-into-view");

const visibleObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    } else {
      entry.target.classList.remove('is-visible');
    }
  });
});

fadeInItems?.forEach(item => {
  visibleObs.observe(item);
});
slideInItems?.forEach(item => {
  visibleObs.observe(item);
});