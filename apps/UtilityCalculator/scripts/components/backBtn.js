export const backBtn = () => {
    const btn = document.createElement('img');
    btn.classList.add('home-btn');
    btn.src = 'images/BackIcon.svg';
    btn.alt = 'Home';
    return btn;
}