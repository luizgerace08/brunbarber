<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- `input[type=date]` em formulários React é sempre NÃO controlado (ref + onChange, sem `value`): reescrever `value` no meio da digitação reseta os segmentos no Chromium e dessincroniza estado e campo (bug real de UX no fluxo de agendamento).
- Timezone do negócio é UTC-3 (America/Sao_Paulo) via offset fixo em `src/lib/business.ts`; horários de agenda 09:00–17:30 de 30 em 30 min.
- WhatsApp é configurado centralmente em `src/lib/business.ts` (`whatsappNumber`); ainda é placeholder até o cliente informar o número real.
