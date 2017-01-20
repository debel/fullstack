function initializeReveal() {
    Reveal.initialize({
        width: 1000,
        height: 1000,
        margin: 0.1,
        minScale: 0.5,
        maxScale: 1.5,
        transition: 'fade',
        transitionSpeed: 'fast',
        controls: true,
        history: true
    });
    hljs.initHighlightingOnLoad();
}