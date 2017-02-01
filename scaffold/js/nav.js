function initializeNav(title) {
    const lastSlide = Reveal.getTotalSlides() - 1;
    const lsKey = 'fs101.' + title;
    const startSlide = parseInt(localStorage.getItem(lsKey), 10) || 0;

    if (!document.location.hash.substring(2)){
    Reveal.addEventListener('ready', () => {
        Reveal.slide(startSlide);
    });
  }

    Reveal.addEventListener('slidechanged', (event) => {
      if (event.indexh < lastSlide) {
        localStorage.setItem(lsKey, event.indexh);
      }
    });

    const topicsToggle = document.querySelector('#topics_toggle');
    let savedState = null;
    topicsToggle.onclick = (event) => {
        if (savedState) {
            topicsToggle.textContent = 'View Schedule';
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
