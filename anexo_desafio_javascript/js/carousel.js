//carousel

//Array storage class
let carouselArr = [];

//class Carousel
class Carousel {

     constructor(imagem, titulo, url) {
        this.imagem = imagem;
        this.titulo = titulo;
        this.url = url;
    }

    static Start(arr){
        if(arr){
            
            if(arr.length > 0){
                Carousel._sequence = 0;
                Carousel._size = arr.length;
                Carousel.Next(); //start
            
                Carousel._interval = setInterval(function(){ Carousel.Next(); }, 2000);
                const btnvoltar = document.querySelector(".voltar");
                const btnavancar = document.querySelector(".avancar");

                if (btnvoltar) btnvoltar.addEventListener("click", Carousel.Voltar);
                if (btnavancar) btnavancar.addEventListener("click", Carousel.Avancar);
            }
            
        } else {
            throw "Method Start need a Array Variable.";
        }
    }
    
    static Next(){
        // PROTEÇÃO CONTRA UNDEFINED: Se por choque de botões o índice sumir ou estourar, reseta para 0
        if (Carousel._sequence >= Carousel._size || Carousel._sequence < 0 || !carouselArr[Carousel._sequence]) {
            Carousel._sequence = 0;
        }

        let itemAtual = carouselArr[Carousel._sequence];
        let elementoImagem = document.getElementById("carousel");
        let elementoTitulo = document.getElementById("carousel-title");

        if (elementoImagem && itemAtual) {
            elementoImagem.style.backgroundImage = `url('img/${itemAtual.imagem}')`;
        }

        if (elementoTitulo && itemAtual) {
            elementoTitulo.innerHTML = `<a href="${itemAtual.url}">${itemAtual.titulo}</a>`;
        }

        Carousel._sequence++;

        if (Carousel._sequence > Carousel._size-1) {
            Carousel._sequence = 0;
        }
    }

    static Voltar() {
        // Para o tempo automático para não atropelar o clique manual
        clearInterval(Carousel._interval);
       
        // CORREÇÃO: Recua 2 posições para compensar o "++" que o Next() faz no final
        Carousel._sequence -= 2;
        
        // Se o número ficar negativo, joga para o final do array de forma circular
        if (Carousel._sequence < 0) {
            Carousel._sequence = Carousel._size + Carousel._sequence;
        }
        
        Carousel.Next();

        // Reinicia o tempo automático do zero
        Carousel._interval = setInterval(function(){ Carousel.Next(); }, 2000);
    }

    static Avancar() {
        // Para o automático, avança e reinicia o tempo
        clearInterval(Carousel._interval);
        
        Carousel.Next();

        Carousel._interval = setInterval(function(){ Carousel.Next(); }, 2000);
    }
};