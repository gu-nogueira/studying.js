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

* No ignews foi utilizado o create-next-app --typescript

* [ ] 1.3 - [Rotas](https://nextjs.org/learn/basics/navigate-between-pages/pages-in-nextjs)

* O next possui seu próprio sistema de rotas (file system based routing)
  * Cada arquivo dentro da pasta pages representa uma rota

* [ ] 1.4 - Typescript

* Para identificar se um determinado pacote possui tipagem ou não, basta adicionar o @types/ antes do nome do pacote
  * Exemplo: @types/react
* Caso seja necessário adicionar o typescript em um projeto next manualmente, basta executar o comando `yarn add typescript @types/react @types/react-dom @types/node -D`
> Uma forma de verificar se um pacote possui tipagem é acessar o site do [npm](https://www.npmjs.com/) e verificar se o pacote possui o ícone `DT` ou `TS` ao lado do nome do pacote. No caso do `DT`, significa que as tipagens devem ser instaladas separadamentes, geralmente com o comando `npm install @types/nome-do-pacote`. Já no caso do `TS`, significa que o pacote já possui tipagem embutida.

* [ ] 1.5 - [Componentes](https://nextjs.org/learn/basics/create-nextjs-app/components)

* [ ] 1.6 - [Estilização](https://nextjs.org/learn/basics/styling-components/styling-basics)

* O next possui suporte a css modules nativamente. Para utilizar, basta criar um arquivo com a extensão `.module.css` e importar o mesmo no componente que deseja utilizar.
  * Esta é uma excelente estratégia para evitar que estilos de um componente afetem outros componentes. Coisa que não ocorre na importação de um arquivo css normal.

* No ignews, foi utilizado `sass`: `yarn add sass`
  * Para utilizar o sass, basta criar um arquivo com a extensão `.module.scss` e importar o mesmo no componente que deseja utilizar.
  * Assim como o `styled-components`, o `sass` também funciona com sintaxe de cascata de elementos.