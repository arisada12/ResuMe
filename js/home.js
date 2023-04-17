// Create class that handling properties of object that transfered to firestore database
class EmailProperties{
    constructor(frontName, backName, cellphoneNum, emailAddr, loveLetter){
        this.data = {
            firstName: frontName,
            lastName: backName,
            telepon: cellphoneNum,
            eMail: emailAddr,
            message: loveLetter
        }
    }
    sendInfo(isi, coll, doc, succ){
        db.collection(coll).doc(doc).set({
            isi
        })
        .then(() => {
            alert("Thanks!")
            location.reload()
        })
        .catch((error) => {
            alert(error)
        })
    }
    static genId(srcTit){
        //generating id so you can use same name for document
        let srcTitle = srcTit
        let letters = "abcdefghijklmnopqrstuvwxyz"
        let id = ""
        for(let i = 0; i < 4; i++){
            id += letters[Math.floor(Math.random()*letters.length)]
        }
        //combine id with your title
        let docName = `${srcTitle}-${id}`
        return docName
    }
}

class ProjectProperties extends EmailProperties{
    constructor(projTitle, projDesc, projUrl, projDate, projID){
        super()
        this.projec = {
            id: projID,
            title: projTitle,
            desc: projDesc,
            url: projUrl,
            creatAt: projDate
        }
    }

}

//Contact Me Stuff

const getForm = document.getElementById("contactMe")

getForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    
    //I am just too lazzy to create new var
    const forMail = new EmailProperties(getForm.firstName.value, getForm.lastName.value, getForm.telepon.value, getForm.eMail.value, getForm.message.value)
    const docMail = EmailProperties.genId(getForm.firstName.value.split(" ").join("-"))
    forMail.sendInfo(forMail.data, "mails", docMail)
})

//add project stuff

//check if login or not

const docProject = document.getElementById("tambahProyek")

login.onAuthStateChanged((user) => {
    if (user) {
        formProject()
    }
})

const formProject = () => {
    const createProjSect = document.createElement("div")
    createProjSect.classList.add("container")
    createProjSect.innerHTML =(`
        <button class="headBtn"><h2>Add Project</h2></button>
        <form id="addProject" class="containerWrapper">
            <label name="title">Your Title:</label>
            <input type="text" name="title" id="titl" class="inputan" placeholder="Max 100 char..." min="1" max="100" required/>
            <label name="description">Description:</label>
            <textarea type="text" name="description" id="desc" class="inputan" placeholder="Max 400 char..." min="1" max="400" required></textarea>
            <label name="url">Link to Your Project or Repo:</label>
            <input type="url" name="url" id="webLink" class="inputan" placeholder="Please use http:// or https:// protocol" required/>
            <button type="submit" class="genBtn" data-button='addBtn'>Add Project</button>
        </form>
    `)
    docProject.innerHTML = ""
    docProject.appendChild(createProjSect)
    const judul = document.getElementById("titl")
    const descrt = document.getElementById("desc")
    const webUrl= document.getElementById("webLink")
    const addBtn = document.querySelector("[data-button='addBtn']")
    const tanggal = new Date()
    
    
    addBtn.addEventListener("click", (e)=>{
        e.preventDefault()
        const docTitle = EmailProperties.genId(judul.value.split(" ").join("-"))
        const forProject = new ProjectProperties(judul.value, descrt.value, webUrl.value,tanggal,docTitle)
        forProject.sendInfo(forProject.projec, "projects", docTitle)
    })

}

//retrieve mail, maybe added soon....