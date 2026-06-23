# Contexto Atual da Aplicação

## Configuração Inicial do Projeto

O projeto foi inicializado utilizando `create-next-app@latest` com as seguintes configurações:
- **Framework:** Next.js (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Linter:** ESLint
- **Estrutura:** Diretório `src` e alias de importação `@/*`

## Configuração de Estilos e Tipografia

### Tailwind CSS
As cores primárias e neutras definidas no `styleguide.md` foram adicionadas ao `tailwind.config.ts` como variáveis CSS personalizadas e classes utilitárias. Isso permite o uso consistente das cores em todo o projeto.

### Fontes
A fonte "Kumbh Sans" (pesos 400 e 700) foi configurada utilizando `@next/font/google` para otimização e carregamento eficiente. Ela foi aplicada globalmente para garantir a consistência tipográfica.

## Mock de Dados de Produtos

Foi criado um mock de dados para os produtos, simulando uma fonte de dados para o e-commerce. Este mock está localizado em `src/data/products.ts` e contém informações detalhadas para cada produto, incluindo:
- `id`: Identificador único.
- `company`: Nome da marca.
- `name`: Nome do produto.
- `description`: Descrição.
- `price`: Preço atual.
- `discountPercentage`: Desconto aplicado.
- `originalPrice`: Preço original.
- `images`: URLs das imagens (principal, miniatura e assets para lightbox).
- `slug`, `category`, `rating`, `stock`: metadados extras para expansão futura.

## Estado Atual do Frontend

A aplicação atualmente apresenta:
- Layout global com `Header`, `Footer` e `CartProvider` em `src/components/layout/MainLayout.tsx`.
- Barra de navegação responsiva com menu móvel opaco e painel lateral no mobile, alinhado ao design fornecido.
- Dropdown de carrinho no cabeçalho com badge de notificação persistente, lista de produtos adicionados, subtotal e botão de checkout.
- Página de produto detalhada em `src/components/ProductDetail.tsx`, incluindo galeria de imagens, miniaturas, seletor de quantidade, botão de adicionar ao carrinho e confirmação visual.
- Componente de lightbox com navegação entre imagens, miniaturas e fechamento por clique no backdrop ou tecla `Esc`.
- A home (`src/app/page.tsx`) exibe o produto principal com fidelidade ao visual do design fornecido.
- A lógica de carrinho está centralizada no contexto (`src/context/cart-context.tsx`) e atualiza o badge e o dropdown corretamente.

## Como Rodar/Testar

Para rodar o projeto localmente:
1. Certifique-se de ter o Node.js (versão 18.x ou superior) e npm instalado.
2. Navegue até a raiz do projeto no terminal.
3. Instale as dependências: `npm install`.
4. Inicie o servidor de desenvolvimento: `npm run dev`.
5. Abra seu navegador e acesse `http://localhost:3000`.

O projeto já está no estágio inicial com o setup de Tailwind, fonte e mock de produto.

Para rodar o projeto localmente:
1. Certifique-se de ter o Node.js (versão 18.x ou superior) e npm/yarn/pnpm instalados.
2. Navegue até a raiz do projeto no terminal.
3. Instale as dependências: `npm install` (ou `yarn install`, `pnpm install`).
4. Inicie o servidor de desenvolvimento: `npm run dev` (ou `yarn dev`, `pnpm dev`).
5. Abra seu navegador e acesse `http://localhost:3000`.

Neste ponto, você verá a página inicial padrão do Next.js, mas a configuração de estilos e fontes já estará aplicada, e os dados mockados estarão disponíveis para serem utilizados.