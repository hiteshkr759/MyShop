# AI Safety Guardrails & Workspace Rules for MyShop

> **CRITICAL ENFORCEMENT NOTICE**
> These rules are MANDATORY and apply to all AI agents, assistants, and subagents operating within the `MyShop` project. Any violation of these guardrails is considered an unauthorized and unsafe action.

---

## 1. Absolute Scope & Workspace Boundaries
- **Project Boundary Only**: You are strictly restricted to the `MyShop` project directory (`d:\Personal Project\MyShop` or current project root).
- **No Outside Access**:
  - NEVER read, view, list, create, edit, modify, or inspect any files, folders, or system resources outside this project root.
  - NEVER use parent directory traversal (e.g., `../..`) that escapes the project root.
  - NEVER access user profile directories, desktop, documents, system files (e.g., `C:\Windows`, `C:\Program Files`, `~/.ssh`, `~/.aws`, system registry, or credentials stores).
  - NEVER inspect, read, or modify other projects or directories on this machine.

---

## 2. Zero-Deletion Policy (Absolute Ban on Deletions)
- **NO FILE OR FOLDER DELETIONS**:
  - You must **NEVER** delete any file, folder, asset, or configuration under any circumstances.
  - Prohibited shell commands: `rm`, `rmdir`, `del`, `erase`, `Remove-Item`, `ri`, `rd`, `git clean`, `git rm`, `shred`.
  - Prohibited programmatic operations: `fs.unlink`, `fs.rm`, `fs.rmdir`, `fs.promises.unlink`, `fs.promises.rm`.
- **NO DATABASE WIPES / DROPS**:
  - Prohibited queries: `DROP DATABASE`, `DROP TABLE`, `DROP COLLECTION`, `TRUNCATE`, or bulk destructive `DELETE FROM` without explicit human confirmation.
- **NO DESTRUCTIVE GIT OPERATIONS**:
  - Prohibited: `git reset --hard`, `git clean -fdx`, `git checkout .` (discarding changes), `git branch -D` without explicit request.
- **Deprecation over Deletion**:
  - If a file or piece of code is obsolete or superseded, archive it, comment it out, or mark it as deprecated. Do NOT delete it unless the user explicitly commands: *"I authorize you to permanently delete [exact filename]"*.

---

## 3. Safe Terminal & Command Execution
- **Working Directory**: All commands must strictly be executed inside `d:\Personal Project\MyShop`.
- **Forbidden Commands**:
  - No system-altering commands (e.g., modifying Windows registry, system services, disk partitioning, network adapter configs).
  - No global package installations without explicit user instruction (`npm install -g` is forbidden; use local devDependencies).
  - No commands that attempt to kill external processes outside the project's own dev server or tasks.
  - No network scanners or unauthorized external socket connections.

---

## 4. Secrets, Privacy & Sensitive Data
- **No Hardcoded Credentials**: Never hardcode API keys, database passwords, secret tokens, or personal identifiers in source code.
- **Environment Isolation**: Always use `.env` for secrets and keep `.env` excluded via `.gitignore`. Provide a `.env.example` with dummy values.
- **No Exfiltration**: Never send workspace code, credentials, or proprietary project logic to unapproved third-party endpoints.

---

## 5. Safe Code Modification & Quality Practices
- **Preserve Documentation & Comments**: Always preserve existing comments, docstrings, and context.
- **Incremental & Verifiable Changes**: Make clean, atomic changes. Run tests/linters or syntax checks to verify before proceeding.
- **Clear User Explanations**: When modifying any core component or proposing major changes, clearly inform the user what was changed and why.
