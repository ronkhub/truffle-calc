#!/usr/bin/env bash
# Setup standard del devcontainer: dipendenze di progetto + tooling CLI condiviso
# (gh via feature, gcloud e Chrome via installer ufficiali, firebase/claude via npm).
# Copia canonica: dev/projects/templates/project-skeleton/repo/.devcontainer/setup.sh
set -euo pipefail

if [ -f package.json ]; then
  npm install
fi

npm install -g @angular/cli firebase-tools @anthropic-ai/claude-code

if ! command -v gcloud >/dev/null 2>&1; then
  curl -sSL https://sdk.cloud.google.com | bash -s -- --disable-prompts --install-dir="$HOME" >/tmp/gcloud-install.log 2>&1
  echo '. "$HOME/google-cloud-sdk/path.bash.inc"' >> "$HOME/.bashrc"
fi

if ! command -v google-chrome >/dev/null 2>&1; then
  curl -fsSL https://dl.google.com/linux/linux_signing_key.pub | sudo gpg --dearmor -o /usr/share/keyrings/google-chrome.gpg
  echo "deb [arch=amd64 signed-by=/usr/share/keyrings/google-chrome.gpg] http://dl.google.com/linux/chrome/deb/ stable main" | sudo tee /etc/apt/sources.list.d/google-chrome.list >/dev/null
  sudo apt-get update -qq && sudo apt-get install -y -qq google-chrome-stable
fi

echo "devcontainer setup complete"
