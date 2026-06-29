# Plan — Ajustes de textos de atendimento

## Resumo

Ciclo **Small** para atualizar copy editorial em três blocos de `app/landing-page.tsx`: temas clínicos, pilar NÓS do Entre Nós e lista de formatos de atendimento. Sem mudança de layout, rotas, API ou SEO.

## Estado atual

| Local | Campo | Texto atual |
|-------|-------|-------------|
| `EmotionalSection` | h2 | O que pode chegar junto com você. |
| `EmotionalSection` | Ansiedade & Angústia | O peso invisível do excesso de futuro e da autocobrança desmedida. |
| `CouplesProgram` | Pilar NÓS | Criar novas formas de diálogo, intimidade e responsabilidade afetiva. |
| `Services` | subtítulo | Clínica & Online |
| `Services` | Psicoterapia Individual | Um espaço seguro para explorar sua subjetividade… |
| `Services` | Terapia de Casal | Sessões estendidas para mediação de conflitos… |
| `Services` | Atendimento Presencial | …Rua Anita Garibaldi, 48, Centro, Laguna. |
| `Services` | Atendimento Online — meta | Brasil |
| `Services` | Atendimento Online — desc | Sessões por videochamada para pacientes em outras localidades… |

## Estado-alvo

Ver copy final em `spec/features/landing-content/readme.md` (seção afetada por este ciclo).

Decisões fechadas com a cliente:

1. Título dos temas → **Questões que podem ser trabalhadas em terapia.**
2. Conflitos & Comunicação → **sem alteração**.
3. Ansiedade & Angústia → texto sobre pensamentos acelerados e preocupações.
4. Pilar NÓS → texto com *diálogo, intimidade e cuidado* e foco na relação desejada.
5. Subtítulo da seção de serviços → **Presencial e online** (sem frase adicional sobre psicologia clínica).
6. Descrições de serviços adaptadas do tom de comunicação da Mirelle, mantendo extensão e estilo da landing.
7. Endereço presencial formatado: **Rua Anita Garibaldi, nº 48, Centro | Laguna**.
8. Atendimento online → meta e descrição mencionam **Brasil e brasileiros no exterior**.
9. Escopo limitado às seções listadas; hero, marquee, footer e SEO ficam de fora.

## Arquivos impactados

- `app/landing-page.tsx` — arrays `items` (`EmotionalSection`), `pillars` (`CouplesProgram`), `services` (`Services`) e subtítulo da seção.
- `spec/features/landing-content/readme.md` — spec canônica (criada/atualizada neste ciclo).

## Abordagem

1. Localizar constantes inline nos três componentes.
2. Substituir strings conforme spec canônica.
3. Revisar visualmente que comprimentos similares não quebram layout.
4. Validar checklist do request e cenários Gherkin.

## Riscos

| Risco | Mitigação |
|-------|-----------|
| Textos adaptados da Mirelle ficarem longos demais | Manter ~2 frases por descrição de serviço, como hoje |
| Meta `Brasil \| brasileiros no exterior` quebrar linha em mobile | Conferir renderização; meta já usa formato curto em outros itens |
| Pipe `\|` no endereço confundir com separador de meta | Padrão solicitado explicitamente; validar visualmente |

## Fora de escopo

- Funcionalidades, formulários, WhatsApp link, imagens
- `app/layout.tsx` (meta tags)
- Outras seções da landing não citadas no request
