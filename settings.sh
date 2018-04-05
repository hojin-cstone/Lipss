#!/bin/sh

echo ""
echo -e '\E[00;31m'"\033[1m/************************************\033[0m"
echo ""
echo -e '\E[00;31m'"\033[1m      npm & gulp setting\033[0m"
echo ""
echo -e '\E[00;31m'"\033[1m************************************/\033[0m"
echo ""
npm init -y
npm i gulp --save-dev

npm i del --save-dev
npm i gulp-concat --save-dev
npm i gulp-imagemin --save-dev
npm i gulp-watch --save-dev

echo ""
echo -e '\E[00;31m'"\033[1m/************************************\033[0m"
echo ""
echo -e '\E[00;31m'"\033[1m      완료\033[0m"
echo ""
echo -e '\E[00;31m'"\033[1m************************************/\033[0m"
echo ""
