# Agent Guidelines & Safety Guardrails for MyShop

This project is governed by strict safety rules that all AI agents must follow.

## Core Directives

1. **Workspace Boundary**:
   - AI operations are confined strictly to `d:\Personal Project\MyShop`.
   - Never access, read, write, or inspect files, settings, or credentials outside this workspace root.

2. **Zero-Deletion Policy**:
   - Never delete any file, folder, database record, git branch, or code snippet.
   - Do not invoke `rm`, `del`, `Remove-Item`, `unlink`, `DROP TABLE`, or destructive git commands like `git reset --hard` or `git clean`.
   - If files are no longer needed, mark them deprecated or archive them into an archive folder.

3. **Safe Execution**:
   - All shell commands must be run within the project directory.
   - Do not install global tools or modify machine-wide configurations.

4. **Security & Secrets**:
   - Keep secrets inside `.env`. Never commit secrets to git. Always use `.env.example`.
