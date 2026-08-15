# Repository instructions

These rules apply to the entire repository.

## Git workflow

- Never create a commit unless the user explicitly asks for a commit in the current conversation.
- Never push commits, branches, or tags unless the user explicitly asks for a push in the current conversation.
- Do not treat approval to edit files, create a branch, or run checks as approval to commit or push.
- Before making any file change, check the current Git branch with `git branch --show-current` and inspect the working tree with `git status --short`.
- Do not start task-specific work directly on `main` or `master`. Create a dedicated branch when the current branch is a protected branch or is unrelated to the requested task.
- Use a short, descriptive branch name such as `fix/privacy-mobile` or `docs/readme-localization`.
- Preserve uncommitted user changes when switching or creating branches. If existing changes make the branch operation unsafe or ambiguous, stop and ask the user before proceeding.
- After completing changes, report the active branch and working-tree state. Leave all changes uncommitted unless the user explicitly requests otherwise.
