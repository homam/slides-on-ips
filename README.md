## VSCode

Use these extensions:

- [SVG](https://marketplace.visualstudio.com/items?itemName=jock.svg)
- [Graphviz Interactive Preview](https://marketplace.visualstudio.com/items?itemName=tintinweb.graphviz-interactive-preview)
- [Marp for VS Code](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode)

1. Open ./chapter-1/index.md in VSCode
2. CMD+Shift+P
3. Markdown: Preview to the side

## Compiling Slides

html:

```bash
npx @marp-team/marp-cli@latest index.md -o index.html
```

pdf:

```bash
npx @marp-team/marp-cli@latest index.md --pdf --allow-local-files -o ips-1-noans.pdf
```