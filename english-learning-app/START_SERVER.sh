#!/bin/bash

echo "===================================="
echo "  Ingliz Tili O'rganish Dasturi"
echo "  Server ishga tushirilmoqda..."
echo "===================================="
echo ""

cd "$(dirname "$0")"

echo "Brauzerni ochish uchun 2 soniya kutib turing..."
sleep 2

# Operatsion tizimga qarab brauzerni ochish
if [[ "$OSTYPE" == "darwin"* ]]; then
    # Mac
    open http://localhost:8000
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open http://localhost:8000
fi

echo "Server ishga tushdi!"
echo "Brauzerni oching: http://localhost:8000"
echo ""
echo "Server to'xtatish uchun: Ctrl+C bosing"
echo ""

python3 -m http.server 8000
