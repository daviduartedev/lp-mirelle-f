# Implementation Notes

## Alterações

Arquivo único: `app/landing-page.tsx`

| Componente | Campo | Alteração |
|------------|-------|-----------|
| `EmotionalSection` | h2 | Novo título de temas clínicos |
| `EmotionalSection` | Ansiedade & Angústia | Nova descrição |
| `CouplesProgram` | Pilar NÓS | Novo texto sobre diálogo, intimidade e cuidado |
| `Services` | subtítulo | `Presencial e online` |
| `Services` | Psicoterapia Individual | Nova descrição |
| `Services` | Terapia de Casal | Nova descrição |
| `Services` | Atendimento Presencial | Endereço formatado com nº e pipe |
| `Services` | Atendimento Online | Meta e descrição com Brasil e brasileiros no exterior |

## Inalterado (conforme escopo)

- `Conflitos & Comunicação`
- Hero, marquee, footer
- `app/layout.tsx`
- Programa Entre Nós (descrição do serviço na lista)

## Verificação

- `npm run build` — exit 0
- Linter — sem erros em `landing-page.tsx`

## Pendente

- Revisão visual manual (mobile/desktop)
- `/validate-cycle`
- `/update-spec`
