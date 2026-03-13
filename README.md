# Arca de Noe Clinica Veterinaria e Pet Shop

Landing page estatica servida com Vite.

## Como rodar localmente

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

## Deploy

O projeto esta pronto para deploy estatico.

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`

O arquivo `netlify.toml` ja foi incluido com essa configuracao.

### GitHub Pages

- O workflow esta em `.github/workflows/deploy.yml`
- Basta subir o projeto para um repositorio GitHub
- Em `Settings > Pages`, deixe o source como `GitHub Actions`
