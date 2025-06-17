function part() {
    let partBut = document.querySelectorAll('.partBut');
    let partCont = document.querySelectorAll('.partCont');

    partBut.forEach((el, i) => {
        el.onclick = () => {
            partCont.forEach((el, i) => {
                el.style.display = 'none';
            })
            partBut.forEach((el, i) => {
                el.style.display = 'block';
            })
            partCont[i].style.display = 'flex';
            partBut[i].style.display = 'none';
            window.scrollTo(0, 0);
        }
    })
}
part()
