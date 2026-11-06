Lívia Maschietto Boneti - 24000749-2
Maria Eduarda Bellarmino Duarte 24036202-2
# ATIVIDADE DE TESTE DE SOFTWARE — TRUCO PAULISTA 
# 1. Introdução 
Este projeto tem como objetivo desenvolver e testar regras de negócio de uma versão 
simplificada do jogo Truco Paulista, utilizando a linguagem Java, o Maven e o 
framework JUnit 5 para a realização de testes automatizados. 
O projeto também possui uma interface interativa no terminal, desenvolvida em Java, 
que permite executar todos os testes ou selecionar um caso específico. Dessa forma, é 
possível verificar se as regras implementadas estão funcionando conforme o 
comportamento esperado. 
# 2. Regras de negócio 
As regras de negócio definem as condições que devem ser respeitadas durante a execução do 
jogo. 
# RN01 
Participantes válidos 
Permitir 2 jogadores individuais ou 4 jogadores divididos em 2 duplas. 
# RN02 
Distribuição das cartas 
Cada jogador recebe exatamente 3 cartas por mão. 
# RN03 
Limite de vazas 
Cada mão pode ter no máximo 3 vazas. 
# RN04 
Força das cartas 
A carta mais forte vence a vaza, considerando as manilhas. 
# RN05 
Vitória da mão 
Vence a mão quem ganhar 2 vazas, considerando as regras de empate. 
# RN06 
Pontuação inicial 
Cada mão começa valendo 1 ponto. 
# RN07 
Pedido de truco 
Um pedido aceito aumenta o valor da mão de 1 para 3 pontos. 
# RN08 
Encerramento 
A partida termina quando um jogador ou dupla alcança pelo menos 12 pontos. 
# 3. Casos de teste 
Os casos de teste foram desenvolvidos para verificar se o sistema respeita as regras de 
negócio estabelecidas. Os testes automatizados utilizam o JUnit 5 e são executados no 
ambiente Java configurado com Maven. 
Cenário                                                  
# CT01 Iniciar partida com um jogador
Rejeitar a partida 
# CT02 Iniciar partida com dois jogadoreS 
Permitir a partida 
# CT03 Iniciar partida com duas duplas
Permitir a partida 
# CT04 Distribuir três cartas para um jogador 
Aceitar a distribuição  
# CT05 Distribuir quatro cartas para um jogador
Rejeitar a distribuição 
# CT06 Comparar cartas de forças diferentes
Identificar a carta mais forte 
# CT07 Uma equipe vencer apenas uma vaza
Não declarar a vitória da mão 
# CT08 Iniciar uma mão 
Definir o valor inicial em um ponto 
# CT09 Adicionar pontuação negativa 
Rejeitar a operação 
# CT10 Solicitar truco 
Permitir o pedido 
# CT11 Atingir doze pontos
Encerrar a partida 
# CT12 Atingir onze pontos
Manter a partida ativa 
# CT13 Comparar cartas de mesma força
Identificar o empate 
# CT14 Aumentar o valor da mão com truco
Alterar o valor para três pontos 
# CT15 Solicitar truco mais de uma vez
Rejeitar o segundo pedido 
# CT16 Adicionar zero ou pontos negativos
Rejeitar a operação 
# CT17 Informar uma equipe inexistente
Rejeitar a operação 
# CT18 Adicionar pontos após o encerramento
Rejeitar a operação 
# CT19 Solicitar truco após o encerramento
Rejeitar a operação 
# CT20 Adicionar pontos à equipe 1 
Atualizar somente a pontuação correta 
