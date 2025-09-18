const body = document.body;
const teamImage = document.querySelector('.team__image');
const team = document.querySelector('.team');
const header = document.querySelector('.header');

let firstTime = true;
let lastHeaderYpage = 100;


const removeLoading = () => {
    body.classList.remove('loading')

    if (firstTime) {
        setTimeout(() => body.classList.remove('is-start'), 600);
        firstTime = false;
    }
};

const setVisibleTeamImage = () => {
    if (teamImage.getBoundingClientRect().top < 200) {
        team.classList.add('show');
    } else {
        team.classList.remove('show');
    }
}

const showHeaderNav = () => {
    if (scrollY > lastHeaderYpage && !firstTime) {
        header.classList.add('is-down');
    } else {
        header.classList.remove('is-down');
    }

    lastHeaderYpage = scrollY;
}

export const onScrollEvent = () => {
    window.addEventListener('wheel', () => {
        removeLoading();
    });

    window.addEventListener('scroll', (evt) => {
        requestAnimationFrame(showHeaderNav);   
        if (teamImage) {
            requestAnimationFrame(setVisibleTeamImage);
        }
    });
    setTimeout(() => {
        removeLoading();
    }, 1300);
};
