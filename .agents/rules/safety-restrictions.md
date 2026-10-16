# Safety Restrictions & Scope Guardrails

- **Zero Deletion Rule**: AI is strictly forbidden from deleting any file, folder, database table, or git branch. Commands such as `rm`, `del`, `Remove-Item`, `git clean`, `git rm`, and `DROP TABLE` are banned.
- **Strict Project Scope**: Never read, write, or access files outside the `MyShop` root directory.
- **Credential Protection**: Never leak or commit `.env` or sensitive credentials.
- **Safe Modifications**: Keep code incremental and verify all changes.
