const Carta = require("./Carta");

class Truco {
    constructor(participantes) {
        if (!Truco.participantesValidos(participantes)) {
            throw new Error("A partida exige 2 jogadores ou 4 jogadores em duplas.");
        }

        this.participantes = participantes;
        this.pontos = [0, 0, 0];
        this.vazasVencidas = [0, 0, 0];
        this.valorMao = 1;
        this.vazasJogadas = 0;
        this.equipeVencedora = 0;
        this.trucoPedido = false;
        this.encerrado = false;
    }

    static participantesValidos(quantidade) {
        return quantidade === 2 || quantidade === 4;
    }

    maoValida(cartas) {
        return Array.isArray(cartas)
            && cartas.length === 3
            && cartas.every(carta => carta instanceof Carta);
    }

    vencedorVaza(cartas, vira) {
        if (!Array.isArray(cartas) || cartas.length !== 2) {
            throw new Error("Uma vaza precisa de exatamente duas cartas.");
        }

        if (!(vira instanceof Carta) || !cartas.every(carta => carta instanceof Carta)) {
            throw new Error("As cartas e a vira são obrigatórias.");
        }

        const comparacao = cartas[0].comparar(cartas[1], vira);

        if (comparacao > 0) return 1;
        if (comparacao < 0) return 2;
        return 0;
    }

    registrarVaza(equipe) {
        this.verificarPartidaAtiva();

        if (equipe !== 1 && equipe !== 2) {
            throw new Error("Equipe inválida.");
        }

        if (this.equipeVencedora !== 0 || this.vazasJogadas >= 3) {
            throw new Error("Esta mão já foi encerrada.");
        }

        this.vazasJogadas++;
        this.vazasVencidas[equipe]++;

        if (this.vazasVencidas[equipe] === 2) {
            this.equipeVencedora = equipe;
            this.adicionarPontos(equipe, this.valorMao);
        }
    }

    pedirTruco() {
        this.verificarPartidaAtiva();

        if (this.trucoPedido) {
            return false;
        }

        this.trucoPedido = true;
        this.valorMao = 3;
        return true;
    }

    adicionarPontos(equipe, quantidade) {
        this.verificarPartidaAtiva();

        if (equipe !== 1 && equipe !== 2) {
            throw new Error("Equipe inexistente.");
        }

        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            throw new Error("A quantidade de pontos deve ser positiva.");
        }

        this.pontos[equipe] += quantidade;

        if (this.pontos[equipe] >= 12) {
            this.encerrado = true;
        }
    }

    novaMao() {
        this.verificarPartidaAtiva();

        this.valorMao = 1;
        this.vazasJogadas = 0;
        this.vazasVencidas[1] = 0;
        this.vazasVencidas[2] = 0;
        this.equipeVencedora = 0;
        this.trucoPedido = false;
    }

    verificarPartidaAtiva() {
        if (this.encerrado) {
            throw new Error("A partida já foi encerrada.");
        }
    }

    getParticipantes() { return this.participantes; }
    getValorMao() { return this.valorMao; }
    getVazasJogadas() { return this.vazasJogadas; }

    getVazasVencidas(equipe) {
        this.validarEquipe(equipe);
        return this.vazasVencidas[equipe];
    }

    getEquipeVencedora() { return this.equipeVencedora; }

    getPontos(equipe) {
        this.validarEquipe(equipe);
        return this.pontos[equipe];
    }

    validarEquipe(equipe) {
        if (equipe !== 1 && equipe !== 2) {
            throw new Error("Equipe inexistente.");
        }
    }

    isEncerrado() { return this.encerrado; }

    podeJogarVaza() {
        return !this.encerrado
            && this.equipeVencedora === 0
            && this.vazasJogadas < 3;
    }
}

module.exports = Truco;
