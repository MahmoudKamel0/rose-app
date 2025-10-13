# Commit Message Rules

## 🎯 Purpose
To maintain a **clean, consistent, and readable Git history**,  
all commit messages must follow a clear structure and naming convention.

example: `feat/users: add features`
---

## Commit Format
Each commit message **must follow** this structure:

1. type
Defines the **purpose** of the commit.  
Common types include:
   1. feat: A new feature 
   2. fix: A bug fix
   3. docs: Documentation only changes
   4. style: Code style changes (formatting, spacing, etc.)
   4. refactor: Code restructuring without changing functionality
   4. chore: Maintenance tasks (configs, dependencies, etc.)

2. scope
Describes the **area or module** affected by the change (e.g. `users`, `auth`, `ui`, `cart`).  
Use lowercase and keep it short.

3. description
A short, **clear explanation** of what was done — written in **imperative form** (like giving a command).

✅ Correct: `add user authentication`
❌ Wrong: `added user authentication`

