
    var converter = new showdown.Converter({emoji:true})

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
            loadDescription();
            break
        case 'projects':
            document.querySelector('#me').style.display = 'none'
            document.querySelector('#projects').style.display = 'block'
            document.querySelector('#contact').style.display = 'none'
            document.querySelector('#navMe').classList.remove('active')
            document.querySelector('#navProjects').classList.add('active')
            document.querySelector('#navContact').classList.remove('active')
            // make sure that the projects are loaded everytime the button is pressed.
            document.querySelector('#projects').innerHTML = ''
            loadProjects()   
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


async function loadDescription(){

    // load the description from the README.md file
    var description = null
    
    await fetch('https://api.github.com/repos/aacraf/aacraf/contents/README.md')
    .then(response => response.json())
    .then(text => {
        description = converter.makeHtml(atob(text.content))
        document.querySelector('#me').innerHTML = `
        <div class="description m-5">
        ${description}
        </div>`
    })
    
}

async function loadProjects(){
// function that loads all the public repositories 
    console.log('loading projects...')

    var repos = null
    var aux = true
    if(document.querySelector('#projects').innerHTML == ''){
        await fetch('https://api.github.com/users/aacraf/repos', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(repos => {

            console.log(aux)
            if(aux)
            {
                aux = false
                console.log("aqui entro")
                var row_size = 3
                let count = 0;
                // store the names to avoid getting the elements twice (TODO: fix this)
                for (var i = 0; i < repos.length; i++) {
                    if (count % row_size == 0) {
                        var row = document.createElement('div')
                        row.classList.add('row')
                        row.classList.add('justify-content-around')
                        row.classList.add('m-5')
                        document.querySelector('#projects').appendChild(row)
                    }
                    var project = document.createElement('div')
                    project.classList.add('project')
                    project.classList.add('col-md-3')

                    // button that will open the project details
                    var view_details = document.createElement('button') 
                    view_details.classList.add('btn')
                    view_details.classList.add('btn-secondary')
                    view_details.innerHTML = 'View'
                    view_details.value = i
                    view_details.addEventListener('click', function(e){
                        var repo = repos[parseInt(e.target.value)]
                        viewProject(repo)
                    })

                    // card containing the information of the project
                    var card = document.createElement('div')
                    card.classList.add('card-body')
                    card.classList.add('col')

                    card.innerHTML = `
                        <div class="image-placeholder">
                            <h4>image</h4>
                        </div>
                        <h5 class="card-title"><strong>${repos[i].name}</strong></h5>
                        <p class="card-text"> ${repos[i].description?repos[i].description:"No description found"}</p>
                    `

                    card.appendChild(view_details)
                    project.appendChild(card)
                    row.appendChild(project)
                    count++
                }
                // remove half of the projects since I get two responses (TODO: fix this)
                var projects = document.querySelectorAll(".project")
                for(let i = projects.length/2; i<projects.length; i++)
                {
                    projects[i].parentNode.removeChild(projects[i])
                    // projects[i].style.display = 'none';
                }
                console.log(projects)

            }
        })
        .catch(err => console.log(err))   
    }

    
}


async function viewProject(repo){
    // function that let you view the details of a repository

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.querySelector('#projects').innerHTML = ''
    // show project details...

    var project = document.createElement('div')
    project.classList.add('project-details')

    var text = ""

    // Get the Readme of the project in order to view the information
    await fetch(repo.contents_url.replace('{+path}', 'README.md'))
    .then(response => response.json())
    .then(data => text = data.content)
    .catch(err => text = "")   

    // TODO: Get the README file and base it on that
    project.innerHTML = `
        <div class="description m-5">
            <h3><strong> ${repo.name} </strong></h3>
            <span style="font-size:0.8rem">Last update: ${new Date(repo.updated_at).toLocaleDateString("en-US", options)}</span>
            <p style="margin-top:4%"> ${repo.description?repo.description:"Project with no description"} </p>
            <p> ${text?converter.makeHtml(atob(text)):"No README file found"} </p>


            <a style="margin-top:5em"href="${repo.html_url}" target="_blank" class="btn btn-secondary">See repo</a>
        </div>  
    `
    document.querySelector('#projects').appendChild(project)
} 


function sendMail(){
    // send an email to my account.
    // TODO: Search for a better option to send the email
    const subject = document.querySelector('#subject-form').value
    const message = document.querySelector('#message-form').value
    window.open(`mailto:aacraaf@gmail.com?subject=${subject}&body=${message}`);
}   