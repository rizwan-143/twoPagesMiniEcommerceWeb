const registerationForm = document.getElementById('registeration-form');
const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

const backToHome = document.getElementById('home');

backToHome.addEventListener('click' , function(){
  window.location.href = '../index.html'
})

registerationForm.addEventListener('submit' , function(event){
    event.preventDefault();
    let resgisterUser = {
        userName : event.target.registrationName.value,
        userEmail : event.target.registrationEmail.value,
        userPassword : event.target.registrationPassword.value,
    };
     let pass = event.target.registrationPassword.value;
     let email = event.target.registrationEmail.value;
     const registeredEmail = registeredUsers.find((user) => user.userEmail === email);
        if(registeredEmail){
            alert('email is already exists !');
            return;
        }
     if(pass.length < 8){
        alert('password can not be less then 8 characters !');
        return;
     }
    registeredUsers.push(resgisterUser);
    localStorage.setItem('registeredUsers' , JSON.stringify(registeredUsers));
    alert('account is registered successfully !');
    event.target.reset();

    console.log(resgisterUser);
    
})



let loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit' , function(event) {
    event.preventDefault();

    let loginEmail = event.target.loginEmail.value;
    let loginPass = event.target.loginPassword.value;

    let findUser = registeredUsers.find((user) => {
      return (
         user.userEmail === loginEmail && user.userPassword === loginPass
       )
    });

    if(findUser){
        alert('user login successfuly');
            localStorage.setItem('currentUser' , JSON.stringify(findUser));
            window.location.href = '../index.html'
            event.target.reset();
    }else{
        alert('invalid credentials !')
    }
})