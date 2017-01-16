window.FullStack101 = Object.freeze({
    initialize(options) {
        initializeReveal();
        if (!options.debug) {
          initializeGA();
        }
        initializeNav(options.title);
        initializePrint();
    }
});
