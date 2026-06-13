// ==========================================
// DATA SYSTEM (BANCO DE DADOS DINÂMICO)
// ==========================================
const dadosCicloVida = [
    { icone: "🌱", titulo: "1. A Semente Dorme", desc: "Tudo começa com uma semente debaixo da terra, dormindo e bebendo água." },
    { icone: "🌿", titulo: "2. O Acordar!", desc: "Ela ganha super força, quebra a casquinha e solta uma folha para o Sol!" },
    { icone: "🌳", titulo: "3. Crescendo Forte", desc: "Comendo luz do Sol e vitaminas da terra ela vira uma plantinha grande." },
    { icone: "🌸", titulo: "4. Lindas Flores", desc: "As flores aparecem para chamar as abelhinhas que ajudam a polinizar." },
    { icone: "🍎", titulo: "5. Fruto Gostoso", desc: "A flor se transforma em um fruto delicioso pronto para comer!" }
];

const dadosImportancia = [
    { icone: "🥛", titulo: "Super Café da Manhã", desc: "A fazenda produz o leite e as frutinhas do seu iogurte de toda manhã!" },
    { icone: "👕", titulo: "Roupas de Algodão", desc: "A agricultura planta o algodão macio usado para fazer suas roupas." },
    { icone: "🦜", titulo: "Amigos da Natureza", desc: "Os agricultores protegem rios e matas para os animais viverem felizes." }
];

const dadosCuriosidades = [
    { q: "As plantas conversam entre si?", a: "Sim! Elas soltam cheiros especiais e avisam as vizinhas se houver perigo por perto!" },
    { q: "O que é um Agro-Herói?", a: "São cientistas e agricultores que plantam muita comida gastando pouca água." },
    { q: "Como as minhocas ajudam?", a: "Elas cavam túneis na terra que ajudam o ar e a água a entrarem até as raízes!" }
];

// Lógica de Estado do Joguinho
let faseAtualJogo = 0; // 0: Inicial, 1: Terra Arada, 2: Semeado, 3: Regado, 4: Crescido

function gerenciarJogo(acao) {
    const display = document.getElementById("plant-display");
    const status = document.getElementById("game-status-text");
    if (!display || !status) return;

    if (acao === "preparar" && faseAtualJogo === 0) {
        faseAtualJogo = 1;
        display.textContent = "🟫";
        status.textContent = "Muito bem! A terra está fofinha. O que colocamos nela agora?";
    } else if (acao === "plantar" && faseAtualJogo === 1) {
        faseAtualJogo = 2;
        display.textContent = "🫘";
        status.textContent = "A semente está quentinha na terra! Ela precisa de bebida agora, o que damos?";
    } else if (acao === "regar" && faseAtualJogo === 2) {
        faseAtualJogo = 3;
        display.textContent = "🌿";
        status.textContent = "Olha! O brotinho nasceu! O que ele precisa para ganhar energia e dar frutos?";
    } else if (acao === "adubar" && faseAtualJogo === 3) {
        faseAtualJogo = 4;
        display.textContent = "🍎🌳";
        status.textContent = "Vivaaa! Com a luz do Sol nasceram lindas maçãs vermelhas! Você ganhou! 🎉 (Clique de novo para reiniciar)";
    } else {
        if (faseAtualJogo === 4) {
            faseAtualJogo = 0;
            display.textContent = "🕳️";
            status.textContent = "Canteiro limpo! Vamos preparar a terra de novo?";
        } else {
            status.textContent = "Ops! Essa ferramenta não serve agora. Tente outro passo para salvar a planta! 🤔";
            display.style.transform = "scale(0.8)";
            setTimeout(() => display.style.transform = "scale(1)", 200);
        }
    }
}

// Roteador de Renderização DOM
function renderizarConteudo() {
    const track = document.getElementById("carousel-track");
    if (track) {
        track.innerHTML = dadosCicloVida.map(item => `
            <li class="carousel-slide">
                <div class="slide-icon">${item.icone}</div>
                <h3>${item.titulo}</h3>
                <p>${item.desc}</p>
            </li>
        `).join('');
    }

    const grid = document.getElementById("grid-importancia");
    if (grid) {
        grid.innerHTML = dadosImportancia.map(item => `
            <article class="card">
                <div class="card-icon">${item.icone}</div>
                <h3>${item.titulo}</h3>
                <p>${item.desc}</p>
            </article>
        `).join('');
    }

    const accordion = document.getElementById("accordion-curiosidades");
    if (accordion) {
        accordion.innerHTML = dadosCuriosidades.map((item, idx) => `
            <div class="accordion-item">
                <button class="accordion-trigger" aria-expanded="false" aria-controls="p-${idx}">
                    <span>${item.q}</span>
                    <span class="seta">▼</span>
                </button>
                <div id="p-${idx}" class="accordion-panel">
                    <p>${item.a}</p>
                </div>
            </div>
        `).join('');
    }
}

// Controladores de Interação
function configurarComponentes() {
    // Escuta botões do jogo
    document.querySelectorAll(".game-btn").forEach(btn => {
        btn.addEventListener("click", () => gerenciarJogo(btn.getAttribute("data-action")));
    });

    // Escuta Carrossel
    const track = document.getElementById("carousel-track");
    const nextBtn = document.getElementById("btn-next");
    const prevBtn = document.getElementById("btn-prev");
    let indexAtual = 0;

    if (nextBtn && prevBtn && track) {
        nextBtn.addEventListener("click", () => {
            indexAtual = (indexAtual + 1) % dadosCicloVida.length;
            track.style.transform = `translateX(-${indexAtual * 100}%)`;
        });
        prevBtn.addEventListener("click", () => {
            indexAtual = (indexAtual - 1 + dadosCicloVida.length) % dadosCicloVida.length;
            track.style.transform = `translateX(-${indexAtual * 100}%)`;
        });
    }

    // Escuta Acordeão
    document.querySelectorAll(".accordion-trigger").forEach(botao => {
        botao.addEventListener("click", () => {
            const painel = botao.nextElementSibling;
            const aberto = botao.getAttribute("aria-expanded") === "true";
            botao.setAttribute("aria-expanded", !aberto);
            painel.style.maxHeight = aberto ? null : painel.scrollHeight + "px";
            botao.querySelector(".seta").textContent = aberto ? "▼" : "▲";
        });
    });

    // Acessibilidade Global
    document.getElementById("btn-contrast").addEventListener("click", () => {
        document.body.classList.toggle("high-contrast");
    });

    let zoom = 100;
    document.getElementById("btn-font-increase").addEventListener("click", () => {
        if(zoom < 130) { zoom += 10; document.documentElement.style.fontSize = `${zoom}%`; }
    });
    document.getElementById("btn-font-decrease").addEventListener("click", () => {
        if(zoom > 90) { zoom -= 10; document.documentElement.style.fontSize = `${zoom}%`; }
    });

    // Animação Scroll
    const elementos = document.querySelectorAll(".scroll-reveal");
    const checarScroll = () => {
        elementos.forEach(el => {
            if (el.getBoundingClientRect().top < (window.innerHeight / 5) * 4) {
                el.classList.add("active");
            }
        });
    };
    window.addEventListener("scroll", checarScroll);
    checarScroll();
}

// Inicializador Único Seguro
window.addEventListener("DOMContentLoaded", () => {
    renderizarConteudo();
    configurarComponentes();
});
