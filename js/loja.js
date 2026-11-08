// Monta a página da Loja a partir da lista em produtos.js

// Idioma escolhido pelo cliente. Por enquanto fica em português do Brasil.
// (O seletor de idioma será criado em uma próxima etapa.)
let idioma = "pt-BR";
try { idioma = localStorage.getItem("idioma") || "pt-BR"; } catch (e) {}

function formatarPreco(produto) {
  if (idioma === "pt-PT") {
    return produto.eur.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
  }
  return produto.brl.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function linkWhatsapp(produto) {
  const mensagem = "Olá! Quero comprar: " + produto.nome + " (" + formatarPreco(produto) + ")";
  return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(mensagem);
}

function criarCartao(produto) {
  const cartao = document.createElement("article");
  cartao.className = "produto";

  const nome = document.createElement("h3");
  nome.textContent = produto.nome;

  const preco = document.createElement("p");
  preco.className = "preco";
  preco.textContent = formatarPreco(produto);

  const botao = document.createElement("a");
  botao.className = "botao";
  botao.href = linkWhatsapp(produto);
  botao.target = "_blank";
  botao.rel = "noopener";
  botao.textContent = "Comprar pelo WhatsApp";

  cartao.append(nome, preco, botao);
  return cartao;
}

const catalogo = document.getElementById("catalogo");

JOGOS.forEach(function (jogo) {
  const secao = document.createElement("section");
  secao.className = "jogo-secao";
  secao.id = jogo.id;

  const titulo = document.createElement("h2");
  titulo.textContent = jogo.nome;

  const lista = document.createElement("div");
  lista.className = "produtos";

  PRODUTOS.filter(function (p) { return p.jogo === jogo.id; })
    .forEach(function (p) { lista.append(criarCartao(p)); });

  secao.append(titulo, lista);
  catalogo.append(secao);
});
