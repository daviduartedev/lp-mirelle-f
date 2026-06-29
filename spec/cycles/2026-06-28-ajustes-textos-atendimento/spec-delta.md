# Spec delta — Ajustes de textos de atendimento

Proposta de alteração da spec canônica. **Não promovida** — aguarda `/update-spec` após `/validate-cycle`.

## Arquivos afetados

| Arquivo | Ação |
|---------|------|
| `spec/features/landing-content/readme.md` | **Criar** — primeira spec editorial da landing |

## Mudanças propostas

### Novo: `spec/features/landing-content/readme.md`

Documentar copy canônico das seções:

- **EmotionalSection** — novo título; nova descrição de Ansiedade & Angústia; Conflitos inalterado
- **CouplesProgram** — nova descrição do pilar NÓS
- **Services** — subtítulo `Presencial e online`; novas descrições de Psicoterapia Individual, Terapia de Casal, Atendimento Presencial (endereço formatado), Atendimento Online (meta + desc com Brasil e brasileiros no exterior)

### Explicitamente fora da spec deste ciclo

Hero, marquee, footer, SEO e demais seções permanecem sem entrada canônica neste delta (podem ser documentadas em ciclo futuro).

## Implementação vs spec

A implementação altera apenas `app/landing-page.tsx`. A spec canônica vive em `spec/features/landing-content/readme.md` como fonte de verdade editorial pós-merge.
