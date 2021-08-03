

document.addEventListener('DOMContentLoaded', () => {
    // by default show the description page
    navigate('me');
})

function navigate(section){
    switch(section){
        case 'me':
            document.querySelector('#me').style.display = 'block';
            document.querySelector('#projects').style.display = 'none';
            document.querySelector('#contact').style.display = 'none';
            document.querySelector('#navMe').classList.add('active');
            document.querySelector('#navProjects').classList.remove('active');
            document.querySelector('#navContact').classList.remove('active');
            break
        case 'projects':
            document.querySelector('#me').style.display = 'none';
            document.querySelector('#projects').style.display = 'block';
            document.querySelector('#contact').style.display = 'none';
            document.querySelector('#navMe').classList.remove('active');
            document.querySelector('#navProjects').classList.add('active');
            document.querySelector('#navContact').classList.remove('active');
            break
        case 'contact':
            document.querySelector('#me').style.display = 'none';
            document.querySelector('#projects').style.display = 'none';
            document.querySelector('#contact').style.display = 'block';
            document.querySelector('#navMe').classList.remove('active');
            document.querySelector('#navProjects').classList.remove('active');
            document.querySelector('#navContact').classList.add('active');
            loadProjects();
            break
        default:
            document.querySelector('#me').style.display = 'block';
            document.querySelector('#projects').style.display = 'none';
            document.querySelector('#contact').style.display = 'none';
            break   
    }
}

function loadProjects(){
// function that loads all the projects done
    
    //TODO: An api to get the projects
    // fetch()
    let projects = document.querySelector('#projects')
    
    // project target html code:
    // <img src="..." class="card-img-top" alt="..."> 
    // <div class="card-body">
    //     <h5 class="card-title">Card title</h5>
    //     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //     <a href="#" class="btn btn-primary">Go somewhere</a>
    // </div>

}