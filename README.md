# Step-by-Step Registration App

Este projeto é um sistema de cadastro multi-etapas (step-by-step) desenvolvido em Next.js e React, utilizando Ant Design para a interface e Zustand para gerenciamento de estado. O objetivo é proporcionar uma experiência de cadastro fluida, validada e responsiva, com persistência de dados entre as etapas.

## ✨ Funcionalidades

- Cadastro dividido em 5 etapas: Identificação, Documento, Contato, Endereço e Revisão.
- Máscara dinâmica para CPF/CNPJ.
- Validação de campos em cada etapa.
- Persistência dos dados entre as etapas usando Zustand.
- Navegação protegida: o usuário só avança se preencher corretamente cada etapa.
- Exibição dos dados formatados na revisão.
- Integração com API para salvar e finalizar o cadastro.
- Interface responsiva e moderna com Ant Design.

## 🚀 Tecnologias

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Ant Design](https://ant.design/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Axios](https://axios-http.com/)
- [TanStack React Query](https://tanstack.com/query/latest)
- [TypeScript](https://www.typescriptlang.org/)

## 📁 Estrutura de Pastas

```
src/
  app/                # Entrypoint Next.js
  components/
    feature/          # Componentes de cada etapa do cadastro
    layout/           # Layouts e cabeçalhos
    pages/            # Páginas principais
  lib/                # Funções utilitárias e formatadores
  providers/          # Providers globais (AntD, React Query)
  services/           # Serviços de API
  stores/             # Zustand store
  styles/             # Estilos globais
  types/              # Tipos TypeScript
```

## ⚙️ Requisitos

- Node.js >= 18.x
- Yarn ou npm
- Variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Altere o valor conforme o endereço da sua API.

## 🛠️ Instalação

```bash
git clone https://github.com/freitasgustavos/step-by-step.git
cd step-by-step
npm install
# ou
yarn install
```

## ▶️ Rodando o Projeto

```bash
npm run dev
# ou
yarn dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.
