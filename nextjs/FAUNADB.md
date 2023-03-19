# Fauna DB

* É um banco de dados serverless, que permite que você armazene dados em um banco de dados sem precisar gerenciar servidores ou bancos de dados.
* Diferente de um Postgres, a conexão só é estabelecida quando o usuário faz uma requisição para o banco de dados, e não quando o servidor é iniciado (24h).

* Um concorrente do Fauna DB é um DynamoDB, que é um banco de dados NoSQL da AWS.
* Outras opções de banco de dados serverless são o MongoDB Atlas, o Firebase e o Supabase.

* O Fauna DB possui uma api própria, que pode ser acessada através de um client, que pode ser instalado através do comando `yarn add faunadb`.

## Estrutura

* O Fauna DB possui uma estrutura em coleções e documentos.
* Uma coleção é um conjunto de documentos.
* Um documento é um conjunto de pares chave-valor.

### Índices

* Os índices são como índices de um livro, são obrigatorios para que o Fauna DB possa fazer buscas (ex. user_by_email).

## FQL

* O Fauna DB possui uma linguagem própria, o FQL (Fauna Query Language), que é uma linguagem de consulta de banco de dados.
* O FQL é uma linguagem de consulta de banco de dados, que é semelhante ao SQL, mas com algumas diferenças.


