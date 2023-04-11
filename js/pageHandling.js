/*Pagination (still beta)*/

const cards = document.querySelector(".cards")
const loading = document.querySelector(".loadingProject")

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
                console.log(project)
                template = `
                <div class="card">
                        <h2>${project.isi.title}</h2>
                        <p>${project.isi.desc}</p>
                        <button><a href="${project.isi.url}"  target="_blank">Know More...</a></button>
                        <button onclick="removeProject('${project.isi.id}')">Delete Project</a></button>
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

let removeProject = (idproject)=>{
    console.log(idproject)
    db.collection("projects").doc(idproject).delete()
        .then(()=>{
            alert("Project deleted")
            location.reload()
        })
        .catch((error)=>{
            alert(error)
        })
}