
# Notepad

Este é um projeto de **Bloco de Notas** minimalista, desenvolvido com **Next.js** e estilizado com **Tailwind CSS**. A aplicação permite criar, editar e gerenciar suas anotações de forma simples e eficiente. O foco está em oferecer uma interface limpa e intuitiva, sem distrações.

## Tecnologias Utilizadas

- **Next.js** - Framework React com suporte a renderização do lado do servidor (SSR) e geração de sites estáticos (SSG).
- **React** - Biblioteca JavaScript para construção de interfaces de usuário.
- **Tailwind CSS** - Framework CSS para estilização rápida e responsiva.
- **Shadcn-UI** - Componentes reutilizáveis para uma interface consistente e minimalista.
  
## Funcionalidades

- Criar, editar e excluir notas.
- Interface minimalista com foco na produtividade.
- Sincronização de estado com persistência local (opcional).

## Estrutura do Projeto

```bash
.
├── app                 # Diretório do App Router (Next.js 13+)
│   └── page.tsx        # Página principal da aplicação
├── components          # Componentes reutilizáveis
├── public              # Arquivos estáticos
├── styles              # Arquivos de estilo global e Tailwind
├── package.json        # Dependências e scripts
├── tailwind.config.js  # Configurações do Tailwind
└── README.md           # Documentação do projeto
```

## Pré-requisitos

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/luizpaulo2005/notepad.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd notepad
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

## Rodando Localmente

1. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

2. Abra o navegador e acesse `http://localhost:3000`.

## Build para Produção

Para gerar a versão de produção do projeto, execute:

```bash
npm run build
```

Isso irá gerar os arquivos otimizados para produção no diretório **`.next`**.
