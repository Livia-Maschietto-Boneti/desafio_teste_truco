const readline = require("node:readline");
const { run } = require("node:test");

const testes = {
    CT01: "deveRejeitarPartidaComUmJogador",
    CT02: "devePermitirPartidaComDoisJogadores",
    CT03: "devePermitirPartidaComDuasDuplas",
    CT04: "deveAceitarDistribuicaoDeTresCartas",
    CT05: "deveRejeitarDistribuicaoDeQuatroCartas",
    CT06: "deveVencerComCartaDeMaiorForca",
    CT07: "naoDeveDeclararVitoriaComApenasUmaVaza",
    CT08: "deveIniciarMaoValendoUmPonto",
    CT09: "deveRejeitarPontuacaoNegativa",
    CT10: "devePermitirPedirTrucoEAumentarValorDaMao",
    CT11: "deveEncerrarPartidaAoAlcancarDozePontos",
    CT12: "naoDeveEncerrarPartidaComOnzePontos",
    CT13: "deveIdentificarEmpateEntreCartasIguais",
    CT14: "deveAumentarValorDaMaoParaTresPontos",
    CT15: "deveRejeitarSegundoPedidoDeTruco",
    CT16: "deveRejeitarPontuacaoZeroOuNegativa",
    CT17: "deveRejeitarJogadorInexistente",
    CT18: "naoDevePermitirPontuarDepoisDoFimDoJogo",
    CT19: "naoDevePermitirPedirTrucoDepoisDoFimDoJogo",
    CT20: "deveAtualizarPontuacaoDoJogadorUm"
};

function listarTestes() {
    console.log("\n===== CASOS DE TESTE =====");
    Object.entries(testes).forEach(([codigo, nome]) => {
        console.log(`${codigo} - ${nome}`);
    });
}

async function perguntar(rl, pergunta) {
    return new Promise(resolve => rl.question(pergunta, resolve));
}

async function iniciar() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let opcao = "";

    do {
        console.log("\n===== TESTADOR TRUCO PAULISTA =====");
        console.log("1 - Executar todos os testes");
        console.log("2 - Consultar um caso de teste específico");
        console.log("3 - Listar os casos de teste");
        console.log("0 - Sair");

        opcao = (await perguntar(rl, "Escolha uma opção: ")).trim();

        if (opcao === "1") {
            console.log('\nExecute "npm test" no terminal para rodar os 20 testes.');
        } else if (opcao === "2") {
            listarTestes();
            const codigo = (await perguntar(rl, "\nDigite o código (ex.: CT01): "))
                .trim().toUpperCase();

            if (testes[codigo]) {
                console.log(`\n${codigo}: ${testes[codigo]}`);
                console.log(`Para executar isoladamente, use: node --test --test-name-pattern="${testes[codigo]}"`);
            } else {
                console.log("Código de teste inexistente.");
            }
        } else if (opcao === "3") {
            listarTestes();
        } else if (opcao === "0") {
            console.log("Encerrando o menu.");
        } else {
            console.log("Opção inválida.");
        }
    } while (opcao !== "0");

    rl.close();
}

module.exports = { iniciar, listarTestes, testes };
