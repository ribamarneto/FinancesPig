# Finances Pig
Aplicativo para dispositivos móveis com o objetivo de ajudar estudantes a controlar seus gastos.


## Configuração do ambiente
### Ferramentas necessárias
  - Node.JS
  - npm
  - Java Oracle ou OpenJDK
  - Android Studio
  
### Configurando o Android Studio
  - Criar um **Virtual Device**, de preferência usando o modelo **Pixel 6** com a versão 33 da API;
  - Abrir o **SDK Manager**, e na aba **SDK Platforms** instalar o **Android 13**. 
  - Na aba **SDK Tools** verificar se os pacotes **Android SDK Platform-Tools** e **Android Emulator** estão instalados. Do contrário, realizar a instalação dos pacotes.
	
## Instalando as dependências do projeto
Após configurar o ambiente e baixar o projeto, usamos o comando abaixo para instalar todas as dependências do projeto.

`npm install`

## Execução do projeto
`npx react-native run-android`