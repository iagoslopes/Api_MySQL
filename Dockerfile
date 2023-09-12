# Use a imagem oficial do Node.js
FROM node:16

# Crie um diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos do projeto para o contêiner
COPY package.json package-lock.json /app/
RUN npm install

# Copie o código-fonte do aplicativo para o contêiner
COPY . /app/

# Exponha a porta que o aplicativo irá ouvir
EXPOSE 3000

#BD
CMD ["node", "script.js"]

# Inicie o aplicativo quando o contêiner for iniciado

#BD
CMD ["node", "app.js"]
