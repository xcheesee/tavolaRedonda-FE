# Tavola Redonda
## Executando front-end

Para executar o front-end dessa aplicacao em um terminal:
- git clone https://github.com/xcheesee/tavolaRedonda-FE.git
- cd tavolaRedonda-FE
- npm i
- npm run dev --open

seguindo esses passos voce podera abrir o navegador e ir ao caminho http://localhost:5173/admin para utilizar o modulo administrativo

## Executando back-end
Para executar o back-end/database dessa aplicacao em um terminal:
- git clone https:github.com/kageofwar/A-Tavola-Redonda-API.git
- cd A-Tavola-Redonda-API
- composer install
- composer update
- php artisan serve

seguindo esses passos voce podera recuperar os dados dos produtos guardados no banco a partir de seu front-end

***LEMBRE-SE QUE A APLICACAO SO FUNCIONARA CORRETAMENTE SE AMBOS AMBIENTES ESTIVEREM CONFIGURADOS E EXECUTANDO EM UMA PORTA DE SUA MAQUINA***
# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
