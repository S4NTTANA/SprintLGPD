//class contato
class contato {
    constructor(nome, sobrenome, email, cpf, telefone, contato) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.cpf = cpf;
        this.telefone = telefone;
        this.contato = contato;
    }
}

function Post(form) {
    let pegarValor = (nomeCampo) => {
        let campo = form.elements.namedItem(nomeCampo);
        return campo ? campo.value : "";
    };

    let data = new contato(
        pegarValor("nome"),
        pegarValor("sobrenome"),
        pegarValor("email"),
        pegarValor("cpf"),
        pegarValor("telefone"),
        pegarValor("contato")
    );
    
    console.log("Dados capturados com sucesso:", data);
}

function Enviar(form) {
    var nomeCampo = document.getElementById("nomeid") || form.elements.namedItem("nome");
    
    if (nomeCampo && nomeCampo.value !== "") {
        alert('Obrigado sr(a) ' + nomeCampo.value + ' os seus dados foram encaminhados com sucesso!');
    } else {
        alert('Obrigado! Seus dados foram encaminhados com sucesso!');
    }
}


document.addEventListener("DOMContentLoaded", function() {
    let checkboxTermos = document.getElementById("chkTermos");
    let botaoEnviar = document.getElementById("btnEnviar");


    if (checkboxTermos && botaoEnviar) {
        checkboxTermos.addEventListener("change", function() {
            botaoEnviar.disabled = !checkboxTermos.checked;
        });
    }

    if (botaoEnviar) {
        botaoEnviar.style.transition = "all 0.3s ease";

        botaoEnviar.addEventListener("mouseover", function() {
            if (!botaoEnviar.disabled) {
                botaoEnviar.style.transform = "scale(1.08)";
                botaoEnviar.style.backgroundColor = "#0056b3";
                botaoEnviar.style.cursor = "pointer";
            }
        });

        botaoEnviar.addEventListener("mouseout", function() {
            botaoEnviar.style.transform = "scale(1)";
            botaoEnviar.style.backgroundColor = "";
        });
    }

    let formulario = document.querySelector("form");
    if (formulario) {
        formulario.addEventListener("submit", function(event) {
            event.preventDefault(); 
            
            Post(this);
            Enviar(this);
            
            this.reset();
            
            if (botaoEnviar) {
                botaoEnviar.disabled = true;
            }
        });
    }
});