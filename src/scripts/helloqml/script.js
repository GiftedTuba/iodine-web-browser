function init() {
    external.extra.helloQmlObject.clicked.connect(function(count){
        alert('You clicked ' + count + ' times')
    })
}

if (window._browser_external) {
    init();
} else {
    document.addEventListener("_browser_external_created", init);
}
