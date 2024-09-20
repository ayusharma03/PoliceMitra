#!/bin/bash

./bin/ollama serve &

pid=$!

sleep 5

echo "Pulling llama3.1 model"
ollama pull llama3.1


wait $pid