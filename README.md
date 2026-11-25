# Secret Sauce — sauce.emeel.fyi

Сайт плагинов Secret Sauce. Пока одна страница — `/gentra-fx`, корень редиректит туда.

```bash
pnpm dev                          # разработка
pnpm build                        # standalone-сборка (public и static копируются внутрь)
PORT=3000 node .next/standalone/server.js
```

Графика — копия `~/Projects/gentra-fx/Assets/` в `public/gentra-fx/`; поменялась в плагине — скопируйте заново.
Ссылки «скоро» (скачать, Telegram, YouTube, GitHub) — константы в начале `app/gentra-fx/page.tsx`.
