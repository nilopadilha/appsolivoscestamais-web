# Cesta Mais - Frontend (Vue 3 + Vite)

Frontend moderno e responsivo para o sistema de monitoramento de preços da Cesta Básica (DIEESE), utilizando crowdsourcing e validação via OCR.

## 🚀 Tecnologias Utilizadas

- **Vue 3 (Composition API)**: Framework core.
- **Vite**: Build tool ultra-rápida.
- **Pinia**: Gerenciamento de estado global.
- **Pinia Plugin Persistedstate**: Persistência de dados do usuário (JWT, Perfil).
- **Vue Router**: Roteamento SPA com Navigation Guards.
- **Tailwind CSS**: Estilização Mobile-First e Design System personalizado.
- **Lucide Vue Next**: Biblioteca de ícones moderna.
- **Axios**: Comunicação robusta com a API REST.

## 🏗️ Arquitetura do Projeto

A estrutura segue padrões de escalabilidade e manutenibilidade:

- `/src/api`: Configuração base do Axios e interceptores (Auth/Erro).
- `/src/services`: Camada de abstração para chamadas à API (AuthService, PrecoService).
- `/src/stores`: Gerenciamento de estado global (Auth, Preco, Toasts).
- `/src/components/ui`: Componentes atômicos e reutilizáveis (Button, Input, Card, Spinner).
- `/src/layouts`: Estruturas de página (DashboardLayout com Mobile Menu).
- `/src/views`: Páginas principais da aplicação (Login, Dashboard, Upload).

## ✨ Funcionalidades Implementadas

1.  **Autenticação JWT**:
    *   Login com máscara de CNPJ.
    *   Interceptor para injeção de Bearer Token.
    *   Tratamento de expiração de sessão (401).
    *   Mocks de teste para perfis ADMIN e SUPERMERCADO.

2.  **Dashboard de Monitoramento**:
    *   Cards de estatísticas rápidas com tendências.
    *   Tabela de envios recentes com badges de status.
    *   Indicadores de progresso de metas mensais.

3.  **Módulo de Registro de Preços (Crowdsourcing)**:
    *   Interface otimizada para uso em smartphones no ponto de venda.
    *   Captura de foto via câmera (`capture="environment"`).
    *   Preview de imagem com validação de tipo e tamanho.
    *   Seleção de itens da cesta DIEESE com carregamento assíncrono.

4.  **Feedback Visual (UX)**:
    *   Sistema de notificações **Toasts** global.
    *   Estados de carregamento (Spinners) em botões e tabelas.
    *   Design ultra-responsivo e moderno (Plus Jakarta Sans).

## 👥 Usuários de Teste (Mock)

| Perfil | CNPJ | Senha |
| :--- | :--- | :--- |
| ADMIN | `00.000.000/0000-00` | `senha123` |
| SUPERMERCADO | `11.111.111/1111-11` | `senha123` |

---

## 🛠️ Instalação e Execução

1.  Instale as dependências:
    ```bash
    npm install
    ```

2.  Rode em modo desenvolvimento:
    ```bash
    npm run dev
    ```

3.  Build para produção:
    ```bash
    npm run build
    ```
