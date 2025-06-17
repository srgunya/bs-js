function sexButton() {
    let sex__button = document.querySelectorAll('.sex__button');
    let sex__shadow = document.querySelectorAll('.sex__shadow');
    let sex__block = document.querySelectorAll('.sex__block');

    for (let i = 0; i < sex__button.length; i++) {

        sex__button[i].onmouseenter = () => sex__shadow[i].style.opacity = 0;
        sex__button[i].onmouseleave = () => sex__shadow[i].style.opacity = .2;

        sex__block[i].onmouseenter = () => sex__shadow[i].style.opacity = .2;
        sex__block[i].onmouseleave = () => sex__shadow[i].style.opacity = 0;
    }
}
sexButton()
