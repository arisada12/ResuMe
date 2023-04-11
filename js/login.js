const container = document.getElementById("loginContainer")

//create login form

const form = () =>{
    const createElement = document.createElement("div")
    createElement.classList.add("landing")
    createElement.innerHTML = (`
        <form id="login">
                    <label name="email">E-mail:</label>
                    <input type="email" id="email"/>
                    <label name="password">Password:</label>
                    <input type="password" id="password" required/>
                    <button class="genBtn" data-button="logBtn">Login</button>
        </form>
    `)

    container.innerHTML = ""
    container.appendChild(createElement)
    const mail = document.getElementById("email")
    const pssw = document.getElementById("password")
    
    const logBtn = document.querySelector("[data-button='logBtn']")
    logBtn.addEventListener("click", (e)=> {
        e.preventDefault()
        firebase.auth().signInWithEmailAndPassword(mail.value, pssw.value)
        .then((Credential) => {
            alert("Welcome!")
        })
        .catch((error) => {
            alert(error)
        });
    })

}

//create landing page

const lnd =() => {
    const landingPage = document.createElement("div")
    landingPage.classList.add("landing")
    landingPage.innerHTML = (`
        <label name "goTo">Go your portfolio or logout:</label>
        <button class="genBtn beranda">My Portfolio</button>
        <button class="genBtn toExit">Log Out</button>
    `)
    container.innerHTML = ""
    container.appendChild(landingPage)

    const beranda = document.querySelector(".beranda")
    const exitPage = document.querySelector(".toExit")

    beranda.addEventListener("click", ()=>{
        location.replace("/")
    })

    exitPage.addEventListener("click", ()=>{
        login.signOut()
        .then(()=>{
            location.reload()
        })
        .catch((error)=>{
            alert(error)
        })
    })
}

//check if login or not

login.onAuthStateChanged((user) => {
    if (user) {
        lnd()
    } else {
        form()
    }
})
