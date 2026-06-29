Feature: Textos de atendimento na landing page

  Visitantes leem informações sobre temas clínicos, programa para casais e formatos
  de atendimento. Este ciclo atualiza copy editorial sem mudar funcionalidades.

  Background:
    Given a landing page publicada

  Scenario: Título da seção de temas clínicos reflete foco terapêutico
    When o visitante rola até a seção de temas que aparecem na clínica
    Then ele vê o título "Questões que podem ser trabalhadas em terapia."

  Scenario: Descrição de ansiedade comunica sobrecarga mental
    When o visitante lê o item "Ansiedade & Angústia"
    Then ele vê uma descrição sobre pensamentos acelerados, preocupações e inquietações ocupando espaço demais na vida

  Scenario: Conflitos e comunicação permanece inalterado
    When o visitante lê o item "Conflitos & Comunicação"
    Then ele vê a descrição sobre diálogo que vira disputa e conexão inalcançável

  Scenario: Pilar NÓS do Entre Nós fala de diálogo, intimidade e cuidado
    When o visitante rola até o programa Entre Nós
    Then no pilar "NÓS" ele vê texto sobre criar novas formas de diálogo, intimidade e cuidado para a relação desejada

  Scenario: Seção de formatos indica presencial e online
    When o visitante rola até "Formatos de Atendimento"
    Then ele vê o subtítulo "Presencial e online"

  Scenario Outline: Descrições de serviços refletem oferta clínica
    When o visitante lê o serviço "<serviço>"
    Then ele vê informação coerente com "<expectativa>"

    Examples:
      | serviço                  | expectativa                                                                 |
      | Psicoterapia Individual  | compreensão de ansiedade, gatilhos e protagonismo na própria vida           |
      | Terapia de Casal         | Psicodrama, criança interna e autoconhecimento em profundidade                |
      | Atendimento Presencial   | endereço Rua Anita Garibaldi, nº 48, Centro | Laguna                          |
      | Atendimento Online       | atendimento no Brasil e para brasileiros no exterior                          |
