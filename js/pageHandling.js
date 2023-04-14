/*delete and edit Project*/

//select some element
const cards = document.querySelector(".cards")
const loading = document.querySelector(".loadingProject")
const edit = document.getElementById("editProject")

//store last poject pages
let latesProject = null;

//fecth data from Firestore
const getNextProject = async () =>{
    loading.classList.add("active")
    const ref = db.collection("projects")
        .orderBy("isi.creatAt")
        .startAfter(latesProject || 0)
        .limit(3)

    const data = await ref.get()

    //output
    let template =''
    data.docs.forEach(doc =>{
        const project = doc.data()
        login.onAuthStateChanged((user) => {
            if (user) {
                template = `
                <div class="card">
                        <h2>${project.isi.title}</h2>
                        <p>${project.isi.desc}</p>
                        <button><a href="${project.isi.url}"  target="_blank">Know More...</a></button>
                        <button onclick="removeProject('${project.isi.id}')">Delete Project</a></button>
                        <button onclick="editProject('${project.isi.id}', '${project.isi.creatAt}', '${project.isi.title}', '${project.isi.desc}', '${project.isi.url}')">Edit Project</a></button>
                </div>`
                cards.innerHTML += template
                loading.classList.remove("active")
            } else {
                template = `
                <div class="card">
                        <h2>${project.isi.title}</h2>
                        <p>${project.isi.desc}</p>
                        <button><a href="${project.isi.url}"  target="_blank">Know More...</a></button>
                </div>`
                cards.innerHTML += template
                loading.classList.remove("active")
            }
        })
        
    })

    //update Latest Project index page
    latesProject = data.docs[data.docs.length - 1]
    if (data.empty){
        loading.classList.remove("active")
        cards.removeEventListener("scroll", handleScroll)

    }

}

//wait for DOM content to load
window.addEventListener("DOMContentLoaded", ()=>getNextProject())

//loadMore
const handleScroll = () =>{
    let triggerHeight = cards.scrollTop + cards.offsetHeight
    if (triggerHeight >= cards.scrollHeight){
        getNextProject()
    }
}

cards.addEventListener("scroll", handleScroll)

//remove project handling

let removeProject = (idproject)=>{
    db.collection("projects").doc(idproject).delete()
        .then(()=>{
            alert("Project deleted")
            location.reload()
        })
        .catch((error)=>{
            alert(error)
        })
}

//edit project handling

let editProject = (idproject, dateProject, nameProject, descProject, urlProject)=>{
    const createEdit = document.createElement("div")
    createEdit.classList.add("popContainer")
    createEdit.innerHTML = (`
        <form id="popEdit">
        <label name="title">Your Title:</label>
        <input type="text" name="title" id="editTitle" class="inputan" placeholder="Max 100 char..." value="${nameProject}" min="1" max="100"/>
        <label name="description">Description:</label>
        <input type="text" name="description" id="editDesc" class="inputan" placeholder="Max 400 char..." value="${descProject}" min="1" max="400"/>
        <label name="url">Link to Your Project or Repo:</label>
        <input type="url" name="url" id="editWeblink" class="inputan" placeholder="Max 100 char..." value="${urlProject}" min="1" max="100"/>
        <div class="buttonContainer">
            <button type="submit" class="genBtn" data-button='editBtn'>Edit Project</button>
            <button class="genBtn" data-button="closeEdit">Close  Editor</button>
        </div>
        </form>
    `)

    edit.innerHTML = ""
    edit.appendChild(createEdit)
    
    const nameInput = document.getElementById("editTitle")
    const descInput = document.getElementById("editDesc")
    const urlInput = document.getElementById("editWeblink")

    const tanggal = dateProject
    const docName = idproject
    
    const editBtn = document.querySelector("[data-button='editBtn']")
    const closeBtn = document.querySelector("[data-button='closeEdit']")

    editBtn.addEventListener("click", (e)=> {
        e.preventDefault()
        const editProject = new ProjectProperties(nameInput.value, descInput.value, urlInput.value, tanggal, docName)
        editProject.sendInfo(editProject.projec, "projects", idproject)
    })

    closeBtn.addEventListener("click", (e)=>{
        e.preventDefault()
        edit.innerHTML = ""
    })
}