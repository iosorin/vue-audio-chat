#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка
npm run build

# переход в каталог сборки
cd dist

# если вы публикуете на пользовательский домен
# echo 'www.example.com' > CNAME

hub init
git add .
git commit -m 'test'
hub create bla

git push -u origin master

hub browse bla

cd -
