# Sistema de Gestão de Totens - Plataforma Administrativa

Sistema de gerenciamento web desenvolvido com **React + Vite + Material-UI** para administrar totens de coleta de dados em pontos de ônibus.

## Características

- ✅ **Design Preto e Branco**: Interface minimalista com gráficos coloridos
- ✅ **Dashboard Completo**: Métricas e visualizações em tempo real com dados da API
- ✅ **Gestão de Totens**: CRUD completo com mapa interativo
- ✅ **Gestão de Perguntas**: CRUD completo para criação e gerenciamento de pesquisas
- ✅ **Gestão de Usuários**: Sistema de pontuação e gerenciamento completo
- ✅ **Análise de Interações**: Estatísticas detalhadas por pergunta com filtros
- ✅ **API Integrada**: Conexão completa com backend FastAPI
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

## Instalação

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Passo a passo

1. **Clone o repositório**

```bash
git clone https://github.com/amand4priscil4/Bussola-Cidada.git
cd Bussola-Cidada
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

## Tema e Design

O projeto utiliza um tema customizado preto e branco:

- **Cores Principais**: Preto (#1a1a1a) e Branco (#ffffff)
- **Cores Secundárias**: Tons de cinza
- **Gráficos Coloridos**: 
  - Verde (#10b981) - Respostas "Sim" e gráficos de sucesso
  - Vermelho (#ef4444) - Respostas "Não"
  - Azul (#3b82f6) - Informações e totens
  - Roxo (#8b5cf6) - Destaques e usuários
  - Amarelo (#f59e0b) - Avisos e perguntas

## Integração com API

### Base URL
```
Produção: https://projeto-bigdata.onrender.com
Desenvolvimento: http://localhost:8000
```

### Services Configurados

Todos os serviços estão implementados e funcionais em `src/services/`:

- **totemService.js** - ✅ Gerenciamento completo de totens
- **perguntaService.js** - ✅ Gerenciamento completo de perguntas
- **usuarioService.js** - ✅ Gerenciamento de usuários e pontuação
- **interacaoService.js** - ✅ Gerenciamento e análise de interações

### Exemplo de Uso

```javascript
import { totemService } from './services/totemService';
import { perguntaService } from './services/perguntaService';
import { usuarioService } from './services/usuarioService';
import { interacaoService } from './services/interacaoService';

// Listar totens
const totens = await totemService.getAll();

// Criar pergunta
await perguntaService.create("Você está satisfeito com o transporte?");

// Atualizar pontuação do usuário
await usuarioService.updatePontuacao('user123', 10);

// Obter estatísticas de interações
const interacoes = await interacaoService.getAll();
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx          # ✅ Menu lateral preto
│   │   ├── AppBar.jsx           # ✅ Barra superior minimalista
│   │   └── Layout.jsx           # ✅ Layout principal
│   ├── common/
│   │   ├── LoadingSpinner.jsx   # ✅ Indicador de carregamento
│   │   ├── ErrorMessage.jsx     # ✅ Mensagens de erro
│   │   └── ConfirmDialog.jsx    # ✅ Diálogo de confirmação
│   └── charts/                  # ✅ Componentes de gráficos
├── pages/
│   ├── Dashboard.jsx            # ✅ Dashboard com dados reais da API
│   ├── totens/
│   │   ├── TotemList.jsx        # ✅ Lista de totens
│   │   └── TotemCreate.jsx      # ✅ Criar totem com mapa
│   ├── perguntas/
│   │   └── Perguntas.jsx        # ✅ CRUD completo de perguntas
│   ├── usuarios/
│   │   └── Usuarios.jsx         # ✅ Gestão completa de usuários
│   └── interacoes/
│       └── Interacoes.jsx       # ✅ Análise de interações por pergunta
├── services/
│   ├── api.js                   # ✅ Configuração Axios
│   ├── totemService.js          # ✅ Implementado
│   ├── perguntaService.js       # ✅ Implementado
│   ├── usuarioService.js        # ✅ Implementado
│   └── interacaoService.js      # ✅ Implementado
├── utils/
│   ├── formatters.js            # ✅ Formatação de dados
│   └── exporters.js             # ✅ Exportação CSV
├── contexts/
│   └── NotificationContext.jsx  # ✅ Notificações globais
├── theme.js                     # ✅ Tema preto e branco
├── routes.jsx                   # ✅ Rotas configuradas
└── App.jsx                      # ✅ Componente raiz
```

## Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Lint
npm run lint
```

## Funcionalidades Implementadas

### ✅ Dashboard
- Cards com métricas em tempo real: Totens, Perguntas, Usuários, Interações
- Gráfico de linha: Interações dos últimos 7 dias com dados reais da API
- Gráfico de pizza: Distribuição Sim/Não com percentuais reais
- Gráfico de barras: Top 5 Totens mais utilizados (com nomes reais)
- Gráfico de barras: Top 5 Perguntas mais respondidas (com texto real)
- Atualização automática ao carregar a página
- Tratamento de erros e estados vazios

### ✅ Gestão de Totens
- Listagem completa com paginação
- Busca por ID ou localização
- Criação com mapa interativo (Leaflet)
- Validação de coordenadas
- Exclusão com confirmação
- Integração completa com API

### ✅ Gestão de Perguntas
- Listagem completa de todas as perguntas
- Campo de busca em tempo real
- Criação via dialog modal
- Campo de texto multiline para perguntas longas
- Exibição de ID (truncado) e data de criação
- Exclusão com confirmação
- Validação de campos vazios
- Feedback de sucesso/erro

### ✅ Gestão de Usuários
- Listagem com busca por hash de usuário
- Criação de novos usuários
- Sistema completo de pontuação
- Atualizar pontuação (valores positivos ou negativos)
- Dialog mostrando pontuação atual antes de atualizar
- Exclusão de usuários com confirmação
- Resumo com total de usuários e pontuação acumulada
- Validação de duplicidade ao criar
- Chips coloridos para pontuação

### ✅ Análise de Interações
- Estatísticas agrupadas por pergunta
- Campo de busca para filtrar perguntas específicas
- Colunas: Pergunta, Total, Sim, Não, % Sim, % Não
- Contadores em tempo real
- Percentuais calculados automaticamente
- Visualização com cores intuitivas (verde/vermelho)
- Ordenação automática por mais respondidas
- Resumo geral no rodapé
- Estado vazio tratado
- Integração completa com API de perguntas e interações

### ✅ Componentes de Layout
- Sidebar preta fixa com navegação
- AppBar minimalista (apenas breadcrumb "Início / Página")
- Botão "Adicionar" contextual (aparece só quando necessário)
- Layout responsivo
- Tema preto e branco customizado
- Altura compacta do AppBar

### ✅ Sistema de Notificações
- Snackbar para feedback de ações
- Context API para notificações globais
- Tipos: sucesso, erro, info e warning
- Auto-dismiss configurável

### ✅ Utilitários
- Formatação de datas (date-fns)
- Formatação de coordenadas geográficas
- Exportação para CSV (preparado)
- Validações de formulário
- Tratamento de erros da API

##  Rotas Disponíveis

```
/ ..................... Dashboard principal
/totens ............... Lista de totens
/totens/novo .......... Criar novo totem
/perguntas ............ Gestão de perguntas
/usuarios ............. Gestão de usuários
/interacoes ........... Análise de interações
```

## Configuração da API

O projeto está configurado para se conectar com a API FastAPI hospedada no Render.

### Verificar Endpoints

Você pode testar a API acessando:
- https://projeto-bigdata.onrender.com/docs (Documentação Swagger)
- https://projeto-bigdata.onrender.com/totens (Listar totens)
- https://projeto-bigdata.onrender.com/perguntas (Listar perguntas)
- https://projeto-bigdata.onrender.com/usuarios (Listar usuários)
- https://projeto-bigdata.onrender.com/interacoes (Listar interações)

### Trocar URL da API

Edite o arquivo `.env`:

```env
VITE_API_BASE_URL=sua-nova-url-aqui
```

**Importante:** Não adicione barra no final da URL!

## Troubleshooting

### Erro: "Cannot find module 'leaflet'"
```bash
npm install leaflet react-leaflet --save
```

### Mapa não aparece
Certifique-se de que o CSS do Leaflet está sendo importado em `TotemCreate.jsx`:
```javascript
import 'leaflet/dist/leaflet.css';
```

### Erro de CORS
A API precisa estar configurada para aceitar requisições do frontend. Verifique se o CORS está habilitado no backend FastAPI:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### API retorna erro 404
Certifique-se de que as rotas não têm barra no final:
- ✅ `/totens`
- ❌ `/totens/`

## 📈 Próximas Melhorias Sugeridas

- [ ] Sistema de autenticação e login
- [ ] Página de detalhes do totem com estatísticas individuais
- [ ] Exportação de relatórios em PDF
- [ ] Filtros avançados (por data, totem, pergunta)
- [ ] Gráficos interativos com drill-down
- [ ] Dashboard personalizado por usuário
- [ ] Notificações push
- [ ] Modo escuro/claro
- [ ] Testes unitários e E2E

## Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é educacional.

## 🔗 Links

- **Repositório**: https://github.com/amand4priscil4/Bussola-Cidada.git
- **API Backend**: https://github.com/LucasSSilvaJS/projeto_bigdata

---

**Status**: ✅ Funcional  
**Versão**: 1.0.0  
**Última atualização**: 27 de Outubro de 2025  
**Desenvolvido com**: ❤️ React + Vite + Material-UI
