function initializeNav() {
    const topicsToggle = document.querySelector('#topics_toggle');
    let savedState = null;
    topicsToggle.onclick = (event) => {
        if (savedState) {
            topicsToggle.textContent = 'List all topics';
            Reveal.setState(savedState);
            savedState = null;
        } else {
            topicsToggle.textContent = 'Back to slides';
            savedState = Reveal.getState();
            Reveal.slide(Reveal.getTotalSlides() - 1);
        }
        event.preventDefault();
        return false;
    };
}
