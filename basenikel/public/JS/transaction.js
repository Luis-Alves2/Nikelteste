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

    getTransaction();
}


document.getElementById("button-logout").addEventListener("click", logout);

function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getTransaction() {
    const transaction = data.transactions;
    let transactionHtml = ``;

    if(transaction.length) {
        transaction.forEach((item) => {
            let type = "Entrada";

            if(item.type === "2") {
                type = "Saída";
            }

            transactionHtml += `
            <tr>
                <th scope="row">${item.date}</th>
                <td>${item.value}</td>
                <td>${type}</td>
                <td>${item.description}</td>
            </tr>
            `
        });
    }
    document.getElementById("transactions-list").innerHTML = transactionHtml;

}

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

    getTransaction();

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
