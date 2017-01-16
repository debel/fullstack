function initializeNav(title) {
    const lastSlide = Reveal.getTotalSlides() - 1;
    const lsKey = 'fs101.' + title;
    const startSlide = parseInt(localStorage.getItem(lsKey), 10) || 0;

    const lastTopic = localStorage.getItem('fs101.LAST_TOPIC');
    const lastTopicLink = document.querySelector('#last_topic');

    if (lastTopic) {    
        lastTopicLink.href = '/' + lastTopic;
        lastTopicLink.textContent = lastTopic;
        lastTopicLink.style.display = 'inline';
    }

    if (title !== 'Welcome' && title !== lastTopic) {
        localStorage.setItem('fs101.LAST_TOPIC', title);
    }

    Reveal.addEventListener('ready', () => {
      Reveal.slide(startSlide);
    });

    Reveal.addEventListener('slidechanged', (event) => {
      if (event.indexh < lastSlide) {
        localStorage.setItem(lsKey, event.indexh);
      }
    });

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
