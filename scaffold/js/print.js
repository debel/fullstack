function addCss(path) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = path;
    document.getElementsByTagName('head')[0].appendChild(link);
}

function removeAllCss() {
    var csss = document.querySelectorAll('link[rel=stylesheet]');
    csss.forEach(css => css.parentElement.removeChild(css));
}

function initializePrint() {
    if (window.location.search.match(/print-pdf/gi)) {
        removeAllCss();

        const printBtn = document.querySelector('#print_topic');
        printBtn.style.display = 'none';
        
        window.print();

        return true;
    }

    return false;
}
