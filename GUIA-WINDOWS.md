# Arca de Noé - Guia Rápido Windows

## 🚀 Para Começar Imediatamente

1. **Dê duplo clique** no arquivo `start.bat`
2. Espere abrir o navegador automaticamente
3. Site estará rodando em `http://localhost:5500`

## 📦 Para Gerar Versão Final

1. **Dê duplo clique** no arquivo `build.bat`
2. Aguarde o processo terminar
3. Arquivos ficarão na pasta `dist/`

## 🌐 Para Deploy no GitHub Pages

1. **Instale o Git** para Windows se ainda não tiver
2. **Abra o terminal** na pasta do projeto:
   - Vá até a pasta
   - Digite `cmd` na barra de endereço e Enter
3. **Execute os comandos:**
   ```bash
   git init
   git add .
   git commit -m "Primeiro commit"
   git branch -M main
   git remote add origin https://github.com/sergiosrdev/arcadenoe.git
   git push -u origin main
   ```
4. **Configure o GitHub Pages:**
   - Vá no repositório > Settings > Pages
   - Source: GitHub Actions
   - Pronto!

## 🔧 Se Tiver Problemas

- **Node.js não encontrado**: Instale em https://nodejs.org
- **Porta ocupada**: Feche outros programas usando a porta 5500
- **Permissão negada**: Execute como Administrador

## 📁 Estrutura do Projeto

```
arcadenoe/
├── start.bat        # Iniciar servidor
├── build.bat        # Gerar versão final
├── index.html       # Página principal
├── src/            # Arquivos de estilo e scripts
├── dist/           # Versão final (gerada pelo build)
└── .github/        # Configuração do GitHub Pages
```
