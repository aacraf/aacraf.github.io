

document.addEventListener('DOMContentLoaded', function() {

    // show about me section first
    document.querySelector('#me').style.display = '';
    document.querySelector('#projects').style.display = 'none';
    document.querySelector('#contact').style.display = 'none';


    // menu content
    document.querySelector('#me').click(function() {
        document.querySelector('#me').style.display = '';
        document.querySelector('#projects').style.display = 'none';
        document.querySelector('#contact').style.display = 'none';
    })

    // menu content
    document.querySelector('#projects').click(function() {
        document.querySelector('#me').style.display = 'none';
        document.querySelector('#projects').style.display = '';
        document.querySelector('#contact').style.display = 'none';
    })

    // menu content
    document.querySelector('#contact').click(function() {
        document.querySelector('#me').style.display = 'none';
        document.querySelector('#projects').style.display = 'none';
        document.querySelector('#contact').style.display = '';
    })

})