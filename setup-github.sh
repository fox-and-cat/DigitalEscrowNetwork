#!/bin/bash

# GitHub Publication Setup Script
# Этот скрипт помогает подготовить проект к публикации на GitHub

set -e

echo "🚀 Digital Escrow Network - GitHub Publication Setup"
echo "======================================================"
echo ""

# Проверяем что git инициализирован
if [ ! -d ".git" ]; then
    echo "❌ Git не инициализирован. Инициализирую..."
    git init
    echo "✅ Git инициализирован"
else
    echo "✅ Git уже инициализирован"
fi

# Проверяем что .env не в git
if git ls-files | grep -q "^\.env$"; then
    echo "⚠️  .env найден в git. Удаляю..."
    git rm --cached .env
    git commit -m "chore: remove .env from git"
    echo "✅ .env удален из git"
else
    echo "✅ .env не в git"
fi

# Проверяем что node_modules не в git
if git ls-files | grep -q "^node_modules/"; then
    echo "⚠️  node_modules найден в git. Удаляю..."
    git rm -r --cached node_modules
    git commit -m "chore: remove node_modules from git"
    echo "✅ node_modules удален из git"
else
    echo "✅ node_modules не в git"
fi

# Проверяем статус git
echo ""
echo "📋 Статус Git:"
git status

echo ""
echo "✨ Предварительная подготовка завершена!"
echo ""
echo "📝 Следующие шаги:"
echo "1. Создайте репозиторий на GitHub: https://github.com/new"
echo "2. Выполните команду для добавления remote:"
echo "   git remote add origin https://github.com/fox-and-cat/DigitalEscrowNetwork.git"
echo "3. Сделайте коммит текущих изменений:"
echo "   git add ."
echo "   git commit -m 'chore: prepare project for GitHub publication'"
echo "4. Отправьте на GitHub:"
echo "   git branch -M main"
echo "   git push -u origin main"
echo "5. Создайте первый релиз:"
echo "   git tag -a v1.1.0 -m 'Release version 1.1.0'"
echo "   git push origin main --tags"
echo ""
echo "🎉 Готово! Ваш проект на GitHub!"
