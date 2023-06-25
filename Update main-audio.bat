@echo off

git pull
git fetch --all
git checkout main-audio
git rebase main
git push origin main-audio

pause