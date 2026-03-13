# Arca de Noe Clinica Veterinaria e Pet Shop

Landing page estatica servida com Vite.

## Como rodar localmente (Windows)

### Opção 1: Usar os arquivos .bat (Recomendado)
```bash
# Para iniciar o servidor de desenvolvimento
start.bat

# Para gerar a versão de produção
build.bat
```

### Opção 2: Usar npm
```bash
npm install
npm run dev
```

O site abre em `http://localhost:5500/`.

## Como gerar producao

```bash
npm run build
```

Os arquivos finais ficam em `dist/`.

Para testar o build localmente:
```bash
npm run preview
```

## Deploy

O projeto esta pronto para deploy estatico.

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`

O arquivo `netlify.toml` ja foi incluido com essa configuracao.

### GitHub Pages

O projeto está configurado para deploy automático no GitHub Pages:

1. **Configure o repositório:**
   - Faça upload do projeto para o repositório `sergiosrdev/arcadenoe`
   - Vá em `Settings > Pages`
   - Em "Source", selecione `GitHub Actions`

2. **Workflow automático:**
   - O workflow em `.github/workflows/deploy.yml` será executado automaticamente
   - Build: `npm run build`
   - Deploy: pasta `dist/` para GitHub Pages

3. **URL final:**
   - `https://sergiosrdev.github.io/arcadenoe/`

**Importante:** O `vite.config.js` já está configurado com `base: '/arcadenoe/'` para funcionar corretamente no GitHub Pages.
