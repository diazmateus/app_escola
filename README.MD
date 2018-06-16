###INSTRUÇÕES DE ACESSO SERVIDOR WEB


O aplicativo esta hospedado, por 15 dias online, de acordo com a disponibilidade da hopedagem escolhida.

Para acessá-lo:

    http://auditive-makes.000webhostapp.com/#/
    
Observação: Se o serviço estiver indisponível hospede a aplicação em seu dispositivo executando os próximos passos

#INSTALAÇÃO


###INSTRUÇÕES DE INSTALAÇÃO DA API

Clone o repositório do GitHub que contém a API

    git clone https://github.com/diazmateus/api_escola.git
    
Acesse a pasta baixada e instale as dependencias necessárias


    npm install
    
Após configure a conexão com o banco de dados MongoDB

    Acesso o arquivo ./config/db_config.js e altere a urlString para o endereço local de seu MongoDB
    
    Ex.: mongodb://localhost/nome_db

Após configurado acesse o terminal e navegue até a pasta da API e execute o comando a seguir, não feche o terminal

    nodemon

Se você acessar ```http://localhost:3001```, deverá observar a mensagem ```Bem vindo a API```




###INSTRUÇÕES DE INSTALAÇÃO DA APLICAÇÃO REACT

Clone o repositório do GitHub

    git clone https://github.com/diazmateus/app_escola.git
    
Após navegue até a pasta e instale as dependencias necessárias

    npm install
    
Após instaladas as dependências configure o caminho da API

    Acesse o arquivo ./src/config.js, e altere a URL_API, para o endereço em que a API está sendo executada.

    Geralmente será http://localhost:3001
    
    A porta foi configurada para ser sempre a 3001

Execute a aplicação

    npm start
    
    
A aplicação estará disponível em seu local como

    http://localhost:3000
    


Documentação v1.0.0. 

Criada por: Mateus Diaz