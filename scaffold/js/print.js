function addCss(path) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = path;
    document.getElementsByTagName('head')[0].appendChild(link);
}

function initializePrint() {
    if (window.location.search.match(/print-pdf/gi)) {
        addCss('../css/pdf.css');
        document.body.className = "print-pdf";
    }
}
