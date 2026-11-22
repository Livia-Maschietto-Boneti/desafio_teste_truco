const test = require("node:test");
const assert = require("node:assert/strict");
const Carta = require("../src/Carta");
const Truco = require("../src/Truco");

const { Valor, Naipe } = Carta;

function carta(valor, naipe) {
    return new Carta(valor, naipe);
}

test("CT01 - deveRejeitarPartidaComUmJogador", () => {
    assert.throws(() => new Truco(1));
});

test("CT02 - devePermitirPartidaComDoisJogadores", () => {
    assert.doesNotThrow(() => new Truco(2));
});

test("CT03 - devePermitirPartidaComDuasDuplas", () => {
    assert.doesNotThrow(() => new Truco(4));
});

test("CT04 - deveAceitarDistribuicaoDeTresCartas", () => {
    const truco = new Truco(2);
    const cartas = [
        carta(Valor.AS, Naipe.PAUS),
        carta(Valor.DOIS, Naipe.COPAS),
        carta(Valor.TRES, Naipe.OUROS)
    ];
    assert.equal(truco.maoValida(cartas), true);
});

test("CT05 - deveRejeitarDistribuicaoDeQuatroCartas", () => {
    const truco = new Truco(2);
    const cartas = [
        carta(Valor.AS, Naipe.PAUS),
        carta(Valor.DOIS, Naipe.COPAS),
        carta(Valor.TRES, Naipe.OUROS),
        carta(Valor.REI, Naipe.ESPADAS)
    ];
    assert.equal(truco.maoValida(cartas), false);
});

test("CT06 - deveVencerComCartaDeMaiorForca", () => {
    const vira = carta(Valor.SEIS, Naipe.OUROS);
    const jogadas = [
        carta(Valor.AS, Naipe.PAUS),
        carta(Valor.TRES, Naipe.COPAS)
    ];
    const truco = new Truco(2);
    assert.equal(truco.vencedorVaza(jogadas, vira), 2);
});

test("CT07 - naoDeveDeclararVitoriaComApenasUmaVaza", () => {
    const truco = new Truco(2);
    truco.registrarVaza(1);
    assert.equal(truco.getVazasVencidas(1), 1);
    assert.equal(truco.getEquipeVencedora(), 0);
    assert.equal(truco.getPontos(1), 0);
});

test("CT08 - deveIniciarMaoValendoUmPonto", () => {
    const truco = new Truco(2);
    assert.equal(truco.getValorMao(), 1);
});

test("CT09 - deveRejeitarPontuacaoNegativa", () => {
    const truco = new Truco(2);
    assert.throws(() => truco.adicionarPontos(1, -1));
});

test("CT10 - devePermitirPedirTrucoEAumentarValorDaMao", () => {
    const truco = new Truco(2);
    assert.equal(truco.pedirTruco(), true);
});

test("CT11 - deveEncerrarPartidaAoAlcancarDozePontos", () => {
    const truco = new Truco(2);
    truco.adicionarPontos(1, 12);
    assert.equal(truco.getPontos(1), 12);
    assert.equal(truco.isEncerrado(), true);
});

test("CT12 - naoDeveEncerrarPartidaComOnzePontos", () => {
    const truco = new Truco(2);
    truco.adicionarPontos(1, 11);
    assert.equal(truco.getPontos(1), 11);
    assert.equal(truco.isEncerrado(), false);
});

test("CT13 - deveIdentificarEmpateEntreCartasIguais", () => {
    const vira = carta(Valor.SEIS, Naipe.OUROS);
    const jogadas = [
        carta(Valor.AS, Naipe.PAUS),
        carta(Valor.AS, Naipe.PAUS)
    ];
    const truco = new Truco(2);
    assert.equal(truco.vencedorVaza(jogadas, vira), 0);
});

test("CT14 - deveAumentarValorDaMaoParaTresPontos", () => {
    const truco = new Truco(2);
    assert.equal(truco.pedirTruco(), true);
    assert.equal(truco.getValorMao(), 3);
});

test("CT15 - deveRejeitarSegundoPedidoDeTruco", () => {
    const truco = new Truco(2);
    assert.equal(truco.pedirTruco(), true);
    assert.equal(truco.pedirTruco(), false);
    assert.equal(truco.getValorMao(), 3);
});

test("CT16 - deveRejeitarPontuacaoZeroOuNegativa", () => {
    const truco = new Truco(2);
    assert.throws(() => truco.adicionarPontos(1, 0));
    assert.throws(() => truco.adicionarPontos(1, -5));
});

test("CT17 - deveRejeitarJogadorInexistente", () => {
    const truco = new Truco(2);
    assert.throws(() => truco.adicionarPontos(3, 1));
});

test("CT18 - naoDevePermitirPontuarDepoisDoFimDoJogo", () => {
    const truco = new Truco(2);
    truco.adicionarPontos(1, 12);
    assert.throws(() => truco.adicionarPontos(2, 1));
});

test("CT19 - naoDevePermitirPedirTrucoDepoisDoFimDoJogo", () => {
    const truco = new Truco(2);
    truco.adicionarPontos(1, 12);
    assert.throws(() => truco.pedirTruco());
});

test("CT20 - deveAtualizarPontuacaoDoJogadorUm", () => {
    const truco = new Truco(2);
    truco.adicionarPontos(1, 2);
    assert.equal(truco.getPontos(1), 2);
    assert.equal(truco.getPontos(2), 0);
});
