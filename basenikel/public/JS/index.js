document.getElementById("link-conta").addEventListener("click", function(){
    console.log("O usuario clicou em criar conta!");
})

const MyModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogger();

document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();

    const senha = document.getElementById("password-create-input").value;
    const confirmSenha = document.getElementById("password-confirm-input").value;
    const email = document.getElementById("email-create-input").value;

    if(email.length < 5){
        alert("Email pequeno demais");
        return;
    }
    if(senha.length < 4){
        alert("Senha pequena demais");
        return;
    }
    if (senha !== confirmSenha) {
        alert("A senha e a confirmação de senha não correspondem. Por favor, verifique.");
        return;
    }

    saveAccount({
        Useremail:email,
        Userpassword:senha,
        transactions: []
    });
    MyModal.hide();

    alert("Conta criada com sucesso!")
})

function saveAccount(data) {
    console.log(data);

    localStorage.setItem(data.Useremail, JSON.stringify(data));
};

//LOGIN

document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();

    const senha = document.getElementById("password-input").value;
    const email = document.getElementById("email-input").value;
    const session = document.getElementById("session-check").checked;

    console.log(email,session);

    const contaAt = getAccount(email);

    if(!contaAt){
        alert("Conta inexistente");
        return;
    }

    if(contaAt){
        if(contaAt.Userpassword == senha){
            window.location.href = "home.html";
        }else{
            alert("Conta inexistente");
            return;
        }

        saveSession(email, session);
    }

});

function getAccount(key){
    const conta = localStorage.getItem(key);
    if(conta){
        return JSON.parse(conta);
    }else{
        return "";
    }
}

function checkLogger(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged){
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}

function saveSession(data, shouldSave){
    if(shouldSave){
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}