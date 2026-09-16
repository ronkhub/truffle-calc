#!/usr/bin/env bash
# Controllo (non bloccante) dello stato dei login, eseguito a ogni avvio del container.
# Copia canonica: dev/projects/templates/project-skeleton/repo/.devcontainer/status.sh
echo "── Login status ──────────────────────────────"
if command -v gh >/dev/null 2>&1; then gh auth status 2>&1 | sed 's/^/[gh]       /'; else echo "[gh]       not installed"; fi
if command -v gcloud >/dev/null 2>&1; then gcloud auth list --format="value(account)" 2>&1 | sed 's/^/[gcloud]   /'; else echo "[gcloud]   not installed"; fi
if command -v firebase >/dev/null 2>&1; then firebase login:list 2>&1 | sed 's/^/[firebase] /'; else echo "[firebase] not installed"; fi
if [ -n "${CLAUDE_CODE_OAUTH_TOKEN:-}" ]; then echo "[claude]   token present"; else echo "[claude]   CLAUDE_CODE_OAUTH_TOKEN non impostato - esegui 'claude setup-token' sull'host"; fi
echo "───────────────────────────────────────────────"
exit 0
