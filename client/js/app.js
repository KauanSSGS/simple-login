const submitButton = document.querySelector(".submit")
const loginForm = document.querySelector(".loginForm")


async function getAuthBody(){
 const authBody = await fetch("/auth").then((res)=>{return res.json()})
 const error = authBody.error
 if(error.status === true){
    sendLoginWarning(error.errors)
    sendBackBrokenData(authBody)
 }
}

function sendLoginWarning(error){
    const warning = document.createElement("div")
    warning.classList.add("warning")
    warning.innerText = error
    loginForm.append(warning)
}

function sendBackBrokenData(authBody){
    const brokenUser = authBody.user.brokenUser
    const brokenUser_username = brokenUser.username 
    const brokenUserPassword = brokenUser.password 

    const usernameInput = document.querySelector(".username")
    const passwordInput = document.querySelector(".password")

    usernameInput.value = brokenUser_username
    passwordInput.value = brokenUserPassword

}


getAuthBody()