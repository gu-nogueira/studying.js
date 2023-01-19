# Fundamentos do Next.js

* 1.1 - [Introdução](https://nextjs.org/learn/foundations/about-nextjs)

* Aplicações next são diferentes de SPA - Single Page Application
* SSR - Server Side Rendering
  * O Next possui uma camada extra para renderização no servidor (servidor N ode.js)
* Trabalham com SSG - Static Site Generation
* ISR - Incremental Static Regeneration
  * Quando o conteúdo é atualizado, o Next gera uma nova versão estática da página
  * O Next.js gera uma nova versão estática da página em segundo plano, sem interromper o tráfego da página atual
  * Quando o usuário acessa a página, o Next.js verifica se a versão estática mais recente está pronta
  * Se estiver, o Next.js serve a versão mais recente
  * Se não estiver, o Next.js serve a versão estática existente
  * Quando a versão estática mais recente estiver pronta, o Next.js a servirá no próximo acesso do usuário

* [ ] 1.2 - [Criando um projeto](https://nextjs.org/learn/basics/create-nextjs-app/setup)
* [ ] 1.3 - [Rotas](https://nextjs.org/learn/basics/navigate-between-pages/pages-in-nextjs)