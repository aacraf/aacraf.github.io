

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
            document.querySelector('#me').style.display = 'none'
            document.querySelector('#projects').style.display = 'block'
            document.querySelector('#contact').style.display = 'none'
            document.querySelector('#navMe').classList.remove('active')
            document.querySelector('#navProjects').classList.add('active')
            document.querySelector('#navContact').classList.remove('active')
            // if there isn't any projects loaded we call the function to load them
            // if(!document.querySelector('#projects').firstChild){
            loadProjects()   
            // }
            break
        case 'contact':
            document.querySelector('#me').style.display = 'none'
            document.querySelector('#projects').style.display = 'none'
            document.querySelector('#contact').style.display = 'block'
            document.querySelector('#navMe').classList.remove('active')
            document.querySelector('#navProjects').classList.remove('active')
            document.querySelector('#navContact').classList.add('active')
            break
        default:
            document.querySelector('#me').style.display = 'block'
            document.querySelector('#projects').style.display = 'none'
            document.querySelector('#contact').style.display = 'none'
            break   
    }
}

async function loadProjects(){
// function that loads all the projects done
    
    // //TODO: An api to get the projects
    console.log('loading projects...')
    await fetch('https://api.github.com/users/aacraf/repos')
    .then(response => response.json())
    .then(repos => {
        console.log(repos.length)
        var row_size = 4
        let count = 0;
        for (var i = 0; i < repos.length; i++) {
        
            if (count % row_size == 0) {
                var row = document.createElement('div')
                row.classList.add('row')
                document.querySelector('#projects').appendChild(row)
            }
            var project = document.createElement('div')
            project.classList.add('project')
            project.classList.add('col-md-3')
            project.innerHTML =  `
            <div class="card-body col">
                <h5 class="card-title">${repos[i].name}</h5>
                <p class="card-text">${repos[i].clone_url}</p>
                <a href="${repos[i].html_url}" class="btn btn-primary">See repo</a>
            </div> 
            `
            row.appendChild(project)
            count++
        }
    })

    
    
    let projects = document.querySelector('#projects')
    
    // project target html code:
    // <img src="..." class="card-img-top" alt="..."> 
    // <div class="card-body">
    //     <h5 class="card-title">Card title</h5>
    //     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //     <a href="#" class="btn btn-primary">Go somewhere</a>
    // </div>

}