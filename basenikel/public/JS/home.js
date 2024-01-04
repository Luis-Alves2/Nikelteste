alert("Código funcionando!")

//INICIO

const MyModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
};

checkLogger();

function checkLogger(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(!logged){
        window.location.href = "index.html";
        return;
    }


    const dataUser = localStorage.getItem(logged);
    if(dataUser){
        data = JSON.parse(dataUser);
        console.log(data.transactions);
    }

    getCashIn();

    getCashOut();

    getTotal();
}

document.getElementById("button-logout").addEventListener("click", logout);

document.getElementById("transactions-button").addEventListener("click", function(){
    window.location.href = "transaction.html";
})

function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getCashIn() {
    const transactions = data.transactions;

    const cashIn = transactions.filter((item) => item.type === "1");

    if(cashIn.length){
        let cashInHtml = ``;
        let limit = 0;
    
        limit = cashIn.length > 5 ? 5 : cashIn.length;

        for (let index = 0; index < limit; index++) {
            cashInHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2"> R$${cashIn[index].value.toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p> ${cashIn[index].description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${cashIn[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
            document.getElementById("cash-in-list").innerHTML = cashInHtml;
            console.log(index);
            console.log(cashIn[index]);
            
        }
    }
}

function getCashOut() {
    const transactions = data.transactions;

    const cashOut = transactions.filter((item) => item.type === "2");

    if(cashOut.length){
        let cashOutHtml = ``;
        let limit = 0;
    
        limit = cashOut.length > 5 ? 5 : cashOut.length;

        for (let index = 0; index < limit; index++) {
            cashOutHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2"> R$${cashOut[index].value.toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p> ${cashOut[index].description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${cashOut[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
            document.getElementById("cash-out-list").innerHTML = cashOutHtml;
            console.log(index);
            console.log(cashOut[index]);
            
        }
    }
}

function getTotal(){
    const transactions = data.transactions;

    let total = 0;

    //total = transactions.reduce((sum, item) => sum+item.value,0);
    transactions.forEach((item) => {
        if(item.type === "1") {
            total+=item.value;
        }else{
            total-= item.value;
        }
    });

    console.log(total);

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;

}

//add lanca

document.getElementById("transaction-form").addEventListener("submit", function(e){
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("Description-input").value;
    const date = document.getElementById("date-input").value;
    
    const type = document.querySelector('input[name="type-input"]:checked').value;

    const currentBalance = calculateBalance();

    if (type === "2" && value > currentBalance) {
        const confirmNegativeBalance = confirm("Adicionar esta despesa deixará seu saldo negativo. Tem certeza que deseja continuar?");
        if (!confirmNegativeBalance) {
            return;
        }
    }

    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });

    saveData(data);
    e.target.reset();
    MyModal.hide()

    getCashIn();
    getCashOut();
    getTotal();

    alert("Lançamento bem sucedido");
})

function calculateBalance() {
    const transactions = data.transactions;
    let balance = 0;

    transactions.forEach((item) => {
        if (item.type === "1") {
            balance += item.value;
        } else {
            balance -= item.value;
        }
    });

    return balance;
}

function saveData(data) {
    localStorage.setItem(logged, JSON.stringify(data));
}