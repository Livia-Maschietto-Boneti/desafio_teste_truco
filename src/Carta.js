class Carta {
    static Valor = Object.freeze({
        QUATRO: "QUATRO",
        CINCO: "CINCO",
        SEIS: "SEIS",
        SETE: "SETE",
        RAINHA: "RAINHA",
        VALETE: "VALETE",
        REI: "REI",
        AS: "AS",
        DOIS: "DOIS",
        TRES: "TRES"
    });

    static Naipe = Object.freeze({
        OUROS: "OUROS",
        ESPADAS: "ESPADAS",
        COPAS: "COPAS",
        PAUS: "PAUS"
    });

    constructor(valor, naipe) {
        if (!Object.values(Carta.Valor).includes(valor)) {
            throw new TypeError("Valor da carta inválido.");
        }

        if (!Object.values(Carta.Naipe).includes(naipe)) {
            throw new TypeError("Naipe da carta inválido.");
        }

        this.valor = valor;
        this.naipe = naipe;
    }

    getValor() {
        return this.valor;
    }

    getNaipe() {
        return this.naipe;
    }

    indiceTruco() {
        const ordem = [
            Carta.Valor.QUATRO,
            Carta.Valor.CINCO,
            Carta.Valor.SEIS,
            Carta.Valor.SETE,
            Carta.Valor.RAINHA,
            Carta.Valor.VALETE,
            Carta.Valor.REI,
            Carta.Valor.AS,
            Carta.Valor.DOIS,
            Carta.Valor.TRES
        ];

        return ordem.indexOf(this.valor);
    }

    forcaManilha() {
        const ordem = {
            [Carta.Naipe.OUROS]: 1,
            [Carta.Naipe.ESPADAS]: 2,
            [Carta.Naipe.COPAS]: 3,
            [Carta.Naipe.PAUS]: 4
        };

        return ordem[this.naipe];
    }

    comparar(outra, vira) {
        if (!(outra instanceof Carta) || !(vira instanceof Carta)) {
            throw new TypeError("As cartas e a vira são obrigatórias.");
        }

        const indiceManilha = (vira.indiceTruco() + 1) % 10;

        const estaManilha = this.indiceTruco() === indiceManilha;
        const outraManilha = outra.indiceTruco() === indiceManilha;

        if (estaManilha && outraManilha) {
            return Math.sign(this.forcaManilha() - outra.forcaManilha());
        }

        if (estaManilha) return 1;
        if (outraManilha) return -1;

        return Math.sign(this.indiceTruco() - outra.indiceTruco());
    }
}

module.exports = Carta;
