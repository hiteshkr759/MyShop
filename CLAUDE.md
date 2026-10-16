# Claude Code Safety Guidelines for MyShop

- **Strict Boundary**: Confine all actions to the `MyShop` directory. Never touch anything outside it.
- **Zero Deletions**: Under no circumstances should you delete files or folders (`rm`, `del`, `Remove-Item`, etc. are forbidden).
- **No Destructive Operations**: Never drop databases or perform hard git resets.
- **Secrets**: Never commit secrets or read credentials outside the workspace.
