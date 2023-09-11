#!/bin/bash

# Função para verificar se um serviço está pronto para aceitar conexões
wait_for_service() {
  local host="$1"
  local port="$2"
  local max_attempts=30
  local attempt=0

  while ! nc -z "$host" "$port" &>/dev/null; do
    if [ $attempt -ge $max_attempts ]; then
      echo "O serviço em $host:$port não está disponível após $max_attempts tentativas."
      exit 1
    fi
    attempt=$((attempt + 1))
    echo "Aguardando $host:$port... (tentativa $attempt/$max_attempts)"
    sleep 2
  done
}

# Inicialize o aplicativo Docker Compose em segundo plano
docker-compose up -d

# Aguarde até que o serviço Node.js esteja pronto
wait_for_service "app" 3000

# Teste a API
echo "Testando a API..."
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/users)

if [ "$response" -eq 200 ]; then
  echo "A API está funcionando corretamente (código de resposta: $response)."
else
  echo "A API não está funcionando corretamente (código de resposta: $response)."
fi

# Encerre o aplicativo Docker Compose
docker-compose down
