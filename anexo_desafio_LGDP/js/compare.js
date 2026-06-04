//car
let carArr = [];

class Car {
    constructor(nome, preco, alturaCacamba, alturaVeiculo, alturaSolo, capacidadeCarga, motor, potencia, volumeCacamba, roda, image){
        this.nome = nome;
        this.preco = preco;
        this.alturaCacamba = alturaCacamba;
        this.alturaVeiculo = alturaVeiculo;
        this.alturaSolo = alturaSolo;
        this.capacidadeCarga = capacidadeCarga;
        this.motor = motor;
        this.potencia = potencia;
        this.volumeCacamba = volumeCacamba;
        this.roda = roda;
        this.image = image;
    }
}

// Procura a posição do carro no array
function GetCarArrPosition(arr, carClass) {
    for(let i = 0; i < arr.length; i++){
        if(arr[i].nome === carClass.nome) {
            return i;
        }
    }
    return -1;
}

// Adiciona ou remove o carro do array de comparação
function SetCarToCompare(el, carClass) {
    if(carClass instanceof Car){
        if(el.checked){
            let posicaoExistente = GetCarArrPosition(carArr, carClass);
            
            if (posicaoExistente === -1) {
                if(carArr.length >= 2) {
                    alert("Você só pode selecionar no máximo 2 veículos para comparação.");
                    el.checked = false; 
                    return;
                }
                carArr.push(carClass);
            }
        } else {
            let posicao = GetCarArrPosition(carArr, carClass);
            if(posicao !== -1) {
                carArr.splice(posicao, 1);
            }
        }
    } else {
        throw "You need set a Car Class";
    }
}

function ShowCompare(){
    if(carArr.length < 2) {
        alert("Por favor, selecione 2 carros para efetuar a comparação.");
        return;
    }
    
    UpdateCompareTable();
    
    let divCompare = document.getElementById("compare") || document.querySelector(".compare") || document.querySelector(".compare-container");
    if (divCompare) {
        divCompare.style.display = "block";
    }
}

function HideCompare(){
    let divCompare = document.getElementById("compare") || document.querySelector(".compare") || document.querySelector(".compare-container");
    if (divCompare) {
        divCompare.style.display = "none";
    }
}

function UpdateCompareTable(){
    if(carArr.length === 2) {
        let carro1 = carArr[0];
        let carro2 = carArr[1];

        // Função auxiliar ajustada para o padrão do seu HTML (ex: compare_modelo_0)
        let preencher = (idBase, sufixo, valor, ehImagem = false) => {
            let el = document.getElementById(`${idBase}_${sufixo}`);
            if(el) {
                if(ehImagem) {
                    // Como o HTML não tem a tag <img> dentro do <td>, criamos ela aqui
                    el.innerHTML = `<img src="${valor}" width="150" alt="Carro" />`;
                } else {
                    // Se o preço ou outro dado vier como número puro do checkbox, converte para string formatada
                    if (idBase === "compare_preco" && typeof valor === "number") {
                        el.innerText = `R$ ${valor.toLocaleString('pt-BR')}`;
                    } else {
                        el.innerText = valor;
                    }
                }
            }
        };

        // Preenche a coluna do Veículo 1 (Sufixo _0 no seu HTML)
        preencher("compare_image", "0", carro1.image, true);
        preencher("compare_modelo", "0", carro1.nome);
        preencher("compare_alturacacamba", "0", carro1.alturaCacamba);
        preencher("compare_alturaveiculo", "0", carro1.alturaVeiculo);
        preencher("compare_alturasolo", "0", carro1.alturaSolo);
        preencher("compare_capacidadecarga", "0", carro1.capacidadeCarga);
        preencher("compare_motor", "0", carro1.motor);
        preencher("compare_potencia", "0", carro1.potencia);
        preencher("compare_volumecacamba", "0", carro1.volumeCacamba);
        preencher("compare_roda", "0", carro1.roda);
        preencher("compare_preco", "0", carro1.preco);

        // Preenche a coluna do Veículo 2 (Sufixo _1 no seu HTML)
        preencher("compare_image", "1", carro2.image, true);
        preencher("compare_modelo", "1", carro2.nome);
        preencher("compare_alturacacamba", "1", carro2.alturaCacamba);
        preencher("compare_alturaveiculo", "1", carro2.alturaVeiculo);
        preencher("compare_alturasolo", "1", carro2.alturaSolo);
        preencher("compare_capacidadecarga", "1", carro2.capacidadeCarga);
        preencher("compare_motor", "1", carro2.motor);
        preencher("compare_potencia", "1", carro2.potencia);
        preencher("compare_volumecacamba", "1", carro2.volumeCacamba);
        preencher("compare_roda", "1", carro2.roda);
        preencher("compare_preco", "1", carro2.preco);
    }
}

// Objetos com as strings batendo com os dados e imagens da pasta img do projeto
const ranger = new Car("Nova Ranger 2022", "R$ 222.790", "511 mm", "1815 mm", "232 mm", "1014 kg", "3.2 Duratorq", "200 cv", "1180 L", "Aro 18", "img/storm.jpg");
const territory = new Car("Territory", "R$ 215.000", "-", "1674 mm", "180 mm", "488 kg", "1.5 Turbo", "150 cv", "420 L", "Aro 18", "img/xls 2.2 diesel.jpg");
const bronco = new Car("Bronco Sport", "R$ 260.000", "-", "1813 mm", "223 mm", "441 kg", "2.0 EcoBoost", "253 cv", "580 L", "Aro 17", "img/XL Cabine.jpg");

// Inicialização segura salvando os gatilhos
document.addEventListener("DOMContentLoaded", function() {
    let botaoComparar = document.getElementById("btn-comparar") || document.querySelector(".btn-compare") || document.querySelector("main button");
    if (botaoComparar) {
        botaoComparar.removeAttribute("onclick"); // Remove o atributo antigo para focar no EventListener
        botaoComparar.addEventListener("click", ShowCompare);
    }

    let botaoFechar = document.getElementById("close-compare") || document.querySelector(".close") || document.querySelector("#compare button");
    if (botaoFechar) {
        botaoFechar.removeAttribute("onclick");
        botaoFechar.addEventListener("click", HideCompare);
    }
});