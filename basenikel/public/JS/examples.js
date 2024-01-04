console.log("teste no log")

let personas = [{
    nome:" Marcelo parreira",
    idade: 43,
    trabalho: "Maluco"
},
{
    nome:" Marcelo parreira",
    idade: 43,
    trabalho: "Maluco"
}
];

console.log(personas);

function addpersonas(pessoa) {
    personas.push(pessoa);
}

addpersonas({
    nome:"A",
    idade: 18,
    trabalho:"Opa"
});

console.log(personas);

function imprimetudo(){
    personas.forEach((item) =>{
        console.log(item.nome);
        console.log(item.idade);
        console.log(item.trabalho);
    })
}

imprimetudo();