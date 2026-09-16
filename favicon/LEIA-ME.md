# Favicon — Mariana Domeneghetti

Coloque nesta pasta os arquivos de favicon gerados.

## Arquivos esperados pelo HTML:

| Arquivo                   | Tamanho  | Uso                               |
|---------------------------|----------|-----------------------------------|
| `favicon-16x16.png`       | 16×16    | Aba do navegador (padrão)         |
| `favicon-32x32.png`       | 32×32    | Aba do navegador (alta resolução) |
| `apple-touch-icon.png`    | 180×180  | Atalho iOS/iPadOS                 |
| `site.webmanifest`        | —        | PWA manifest (opcional)           |

## Como gerar:
1. Crie um ícone quadrado (mínimo 512×512px) com as iniciais "MD" ou logotipo
2. Use o site https://realfavicongenerator.net para gerar todos os tamanhos
3. Baixe o pacote e coloque os arquivos nesta pasta

## Enquanto o favicon não estiver disponível:
O HTML já tem as tags preparadas. O navegador simplesmente não exibirá favicon
até que os arquivos sejam adicionados — sem erros de carregamento.
