# 🚀 Sistema de Gestão de Totens - Plataforma Administrativa

Sistema de gerenciamento web desenvolvido com **React + Vite + Material-UI** para administrar totens de coleta de dados em pontos de ônibus.

## 📋 Características

- ✅ **Design Preto e Branco**: Interface minimalista com gráficos coloridos
- ✅ **Dashboard Completo**: Métricas e visualizações em tempo real
- ✅ **Gestão de Totens**: CRUD completo com mapa interativo
- ✅ **Gestão de Perguntas**: Criação e gerenciamento de pesquisas
- ✅ **Visualização de Usuários**: Histórico de interações
- ✅ **Análise de Dados**: Gráficos e exportação para CSV
- ✅ **API Integrada**: Conexão com backend FastAPI
- ✅ **Responsivo**: Funciona em desktop, tablet e mobile

## 🛠️ Stack Tecnológica

- **React 18.x** - Framework JavaScript
- **Vite 5.x** - Build tool e dev server
- **Material-UI v5** - Biblioteca de componentes
- **React Router v6** - Roteamento
- **Axios** - Cliente HTTP
- **Recharts** - Gráficos interativos
- **React Leaflet** - Mapas interativos
- **date-fns** - Manipulação de datas

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Passo a passo

1. **Navegue até a pasta do projeto**

```bash
cd projeto-gestao-totens
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

O arquivo `.env` já está configurado com:

```env
VITE_API_BASE_URL=https://projeto-bigdata.onrender.com
```

Para desenvolvimento local, altere para:

```env
VITE_API_BASE_URL=http://localhost:8000
```

4. **Execute o projeto**

```bash
npm run dev
```

O projeto estará disponível em: `http://localhost:5173`

## 🎨 Tema e Design

O projeto utiliza um tema customizado preto e branco:

- **Cores Principais**: Preto (#1a1a1a) e Branco (#ffffff)
- **Cores Secundárias**: Tons de cinza
- **Gráficos Coloridos**: 
  - Verde (#10b981) - Respostas "Sim" e gráficos de sucesso
  - Vermelho (#ef4444) - Respostas "Não"
  - Azul (#3b82f6) - Informações
  - Roxo (#8b5cf6) - Destaques
  - Amarelo (#f59e0b) - Avisos

## 🔌 Integração com API

### Base URL
```
Produção: https://projeto-bigdata.onrender.com
Desenvolvimento: http://localhost:8000
```

### Services Configurados

Todos os serviços estão prontos e configurados em `src/services/`:

- **totemService.js** - Gerenciamento de totens
- **perguntaService.js** - Gerenciamento de perguntas
- **usuarioService.js** - Gerenciamento de usuários
- **interacaoService.js** - Gerenciamento de interações

### Exemplo de Uso

```javascript
import { totemService } from './services/totemService';

// Listar todos os totens
const totens = await totemService.getAll();

// Criar novo totem
await totemService.create(-8.0522, -34.8953);

// Buscar totem específico
const totem = await totemService.getById('totem_id');

// Excluir totem
await totemService.delete('totem_id');
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx          # Menu lateral preto
│   │   ├── AppBar.jsx           # Barra superior
│   │   └── Layout.jsx           # Layout principal
│   ├── common/
│   │   ├── LoadingSpinner.jsx   # Indicador de carregamento
│   │   ├── ErrorMessage.jsx     # Mensagens de erro
│   │   └── ConfirmDialog.jsx    # Diálogo de confirmação
│   └── charts/                  # Componentes de gráficos
├── pages/
│   ├── Dashboard.jsx            # Dashboard com gráficos coloridos
│   ├── totens/
│   │   ├── TotemList.jsx        # Lista de totens
│   │   └── TotemCreate.jsx      # Criar totem com mapa
│   ├── perguntas/               # (A implementar)
│   ├── usuarios/                # (A implementar)
│   └── interacoes/              # (A implementar)
├── services/
│   ├── api.js                   # Configuração Axios
│   ├── totemService.js          # ✅ Pronto
│   ├── perguntaService.js       # ✅ Pronto
│   ├── usuarioService.js        # ✅ Pronto
│   └── interacaoService.js      # ✅ Pronto
├── utils/
│   ├── formatters.js            # ✅ Formatação de dados
│   └── exporters.js             # ✅ Exportação CSV
├── contexts/
│   └── NotificationContext.jsx  # ✅ Notificações globais
├── theme.js                     # ✅ Tema preto e branco
├── routes.jsx                   # ✅ Configuração de rotas
└── App.jsx                      # ✅ Componente raiz
```

## 🚀 Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 📊 Funcionalidades Implementadas

### ✅ Dashboard
- Cards com métricas: Totens, Perguntas, Usuários, Interações
- Gráfico de linha: Interações ao longo do tempo (verde)
- Gráfico de pizza: Distribuição Sim/Não (verde e vermelho)
- Gráfico de barras: Top 5 Totens (azul)
- Gráfico de barras: Top 5 Perguntas (amarelo)

### ✅ Gestão de Totens
- Listagem com paginação e busca
- Criação com mapa interativo (Leaflet)
- Validação de coordenadas (-90/90, -180/180)
- Exclusão com confirmação
- Formato de exibição de IDs

### ✅ Componentes de Layout
- Sidebar preta com menu de navegação
- AppBar com busca, filtros e perfil
- Layout responsivo
- Tema preto e branco customizado

### ✅ Sistema de Notificações
- Snackbar para sucesso, erro, info e warning
- Context API para notificações globais
- Feedback visual em todas as ações

### ✅ Utilitários
- Formatação de datas (date-fns)
- Formatação de coordenadas
- Exportação para CSV
- Validações de formulário

## 📝 Próximas Implementações

Para completar o sistema, ainda faltam implementar:

### Perguntas
- [ ] Página de listagem
- [ ] Formulário de criação
- [ ] Visualização de detalhes
- [ ] Preview no totem

### Usuários
- [ ] Página de listagem
- [ ] Visualização de histórico
- [ ] Detalhes de interações

### Interações
- [ ] Página de listagem com filtros
- [ ] Exportação de dados
- [ ] Análises detalhadas
- [ ] Visualização de score

## 🎯 Como Continuar o Desenvolvimento

1. **Criar páginas de Perguntas**: Use `TotemList.jsx` como base
2. **Criar páginas de Usuários**: Similar à listagem de totens
3. **Criar páginas de Interações**: Adicionar filtros e exportação
4. **Adicionar página de detalhes do Totem**: Com mapa e estatísticas
5. **Implementar sistema de autenticação** (fase futura)

## 🔧 Configuração da API

O projeto já está configurado para se conectar com a API FastAPI.

### Verificar Endpoints

Você pode testar a API acessando:
- https://projeto-bigdata.onrender.com/docs (Documentação Swagger)
- https://projeto-bigdata.onrender.com/health (Health check)

### Trocar URL da API

Edite o arquivo `.env`:

```env
VITE_API_BASE_URL=sua-nova-url-aqui
```

## 🐛 Troubleshooting

### Erro: "Cannot find module 'leaflet'"
```bash
npm install leaflet react-leaflet --save
```

### Mapa não aparece
Certifique-se de que o CSS do Leaflet está sendo importado:
```javascript
import 'leaflet/dist/leaflet.css';
```

### Erro de CORS
A API precisa estar configurada para aceitar requisições do frontend. Verifique os headers CORS na API.

## 📄 Licença

Educacional

---

**Status**: Em desenvolvimento  
**Versão**: 1.0.0  
**Última atualização**: 27/Outubro 2025
