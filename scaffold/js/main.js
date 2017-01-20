window.FullStack101 = Object.freeze({
    initialize(options) {
        if (!initializePrint()) {
        initializeReveal();
        if (!options.debug) {
          initializeGA();
        }
        initializeNav(options.title);
        }
    }
});
