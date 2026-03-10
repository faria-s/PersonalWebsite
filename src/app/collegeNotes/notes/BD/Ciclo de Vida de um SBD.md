# 1 - Dados, Informação e Conhecimento
### Tarefas Sobre os Dados

**Data** -> elementos básicos/átomos
**Informação** -> Define contexto ("O quê?", "Porquê?", "Onde?", "Quando?" ou "Quem?")
**Conhecimento** -> Aplicação da experiência após observações ("Como?)
**Sabedoria** -> aprofundamento do conhecimento contextual ("Porquê?")

**Sistema de Gestão de Base de Dados (SGBD)**

# 2 - O Ciclo de Vida do Desenvolvimento de uma Base de Dados

- Os modelos de dados são constituídos por diagramas/esquemas

Passos criação base de dados Metodologia Conolly e Begg:
 -> Desenho Conceptual de Base de Dados 
 -> Desenho Lógico da Base de Dados 
 -> Desenho Físico da Base de Dados

# 3 - Definição do Sistema

### Contextualização:

- Processo de desenvolvimento de uma base de dados deve anteceder o próprio processo de construção
- Definir de forma concreta as “fronteiras” do problema que temos em mãos,

### Fundamentação:

- Descrever em traços gerais o porquê da necessidade da base de dados, apresentando de forma breve os sistemas e processos

### Análise de Viabilidade:
- Estudo a ser realizado numa fase preliminar do levantamento de requisitos
	-> Quais os principais objetivos ?
	-> Calendário estabelecido e com os recursos disponíveis
	-> Os sistemas estão preparados adequadamente?

# 4 - Levantamento de Requisitos

- Identificar e caracterizar os elementos de dados mais relevantes para o problema em causa
### Dividindo os requisitos nas seguintes classes:

**Administração** -> acesso, monitorização, segurança, etc.
**Exploração** -> queries, relatórios, procedimentos, etc.
**Descrição** -> objectos de dados, domínios, restrições, etc.


# 5 - Desenho Conceptual 

- Construção de um modelo de informação utilizado numa organização

- **Vistas** -> conjunto de dados requeridos por um determinado utilizador para tomar/realizar uma tarefa, facilitando o processo de modelação. Designadas por **modelo de dados conceptual local**

- Tipos de entidades
- Tipos de relacionamentos.  
- Atributos.  
- Domínios dos atributos.  
- Chaves candidatas.  
- Chaves primárias.

##  Etapas da modelação Conceptual:

1. Construção do modelo de dados conceptual local para cada vista de utilizador.  
### 2. Identificação dos tipos de entidades.  

- Identificação dos principais tipos de entidades
- Uma **entidade** é um objecto ou um conceito que está claramente identificado numa organização como tendo uma existência independente.
- Devemos atribuir a cada entidade designações óbvias e com significado  os nomes e as descrições

**Deve Incluir:**
-> Nome da Entidade
-> Descrição
-> Sinónimos e outras designações conhecidas
-> Ocorrência

### 3. Identificação dos tipos de relacionamentos.

- Identificação dos relacionamentos que possam existir entre as entidades

**Unários/Recursivos** -> envolvem uma entidade
**Binários** -> envolvem duas entidades
**Complexos** -> envolvem três ou mais entidades

#### Documentação do Relacionamento
- **Nome das Entidades envolvidas**
- **Designação do Relacionamento**
- **Cardinalidade** -> (1:1) ; (1:N) ; (N:M)
- **Participação** -> (P:P) ; (P:T) ; (T:T)

### 4. Identificação e associação dos atributos com tipos de entidades ou relacionamentos.  
- Um **atributo** considera a atribuição de uma designação que deverá ser esclarecedora  para o utilizador acerca do seu significado e conteúdo.
- Podem ser:
	-> Simples -> elementares
	-> Compostos -> contém vários atributos simples
	-> Derivados ou calculados -> com base noutros atributos

##### Caracterização de um atributos:
- O nome e caracterização do atributo.  
- Designações alternativas ou sinónimos que o atributo possa ter.  
- Tipo de dados e comprimento.  
- Valores de omissão.  
- Em que situações o atributo poderá ter ou não valores nulos.  
- No caso de um atributo composto, quais são os atributos simples que o integram. 
- Quando o atributo é derivado, indicar a forma como é calculado. 
- Indicar quando um atributo é multivalor.

### 5. Identificação dos domínios dos atributos.  

- O **domínio de um atributo** conjunto de valores dos quais um ou mais atributos assumem os seus valores

### 6. Identificação dos atributos chave.

Escolher a chave primária:
- com o menor conjunto de atributos.  
- com menos possibilidades de ter os seus valores modificados.  
- com menos probabilidade de perder a sua unicidade no futuro.
- de menor tamanho.  
- mais “conveniente”, que seja mais fácil de utilizar

### 7. Detalhe ou generalização dos tipos de entidades.  

- Identificação de tipos de entidades super-classe ou sub-classe
- O conceito de especialização(detalhe) / generalização está associado normalmente com a modelação **ER(diagramas Entidade-Relacionamento)**
- **Especialização de Super-Classe** -> evidenciar as diferenças através da definição de uma ou mais subclasses para uma entidade
- **Generalização de Super-Classe** -> evidenciar as características comuns entre entidades por forma a definir uma entidade mais genérica
- A escolha é muitas vezes subjectiva e dependente das características do problema que queremos modelar e do seu contexto.
- As classes especializadas são denominadas por subclasses, enquanto que uma classe generalizada é denominada de superclasse.
• Uma subclasse herda os atributos da sua superclasse.

### 8. Desenho de diagramas ER

- Representar do ponto de vista conceptual a vista do utilizador sobre a organização
- Diagrama de Chen

### 9. Revisão do modelo de dados com o utilizador.

- Revisão do modelo de dados, no sentido de assegurar que o modelo é uma representação verdadeira de vista do utilizador sobre a organização
- **Dicionário de Dados** -> documentação de suporte incluindo a sua descrição

# 6 - Desenho Lógico

- Processo de  construção de um dado modelo de informação baseado num  modelo de dados específico, mas que é independente de qualquer SGBD ou de outras considerações físicas
### Construção e validação do modelo de dados lógico local:

1. Derivação de relações do modelo de dados local.  
2. Validação do modelo através da normalização.  
3. Validação do modelo com as transacções do utilizador.  
4. Desenho do modelo lógico.  
5. Definição de restrições de integridade.  
6. Revisão do modelo de dados local com o utilizador.
### Construção e validação do modelo de dados lógico global:
 
 1. Validar o modelo de dados global.  
 2. Analisar o crescimento da base de dados no futuro.  
 3. Desenhar a versão final do diagrama do esquema lógico.  
 4. Revisão do modelo global final com os utilizadores

### Conversão do Modelo Conceptual num  Modelo Lógico

- Refinamento do modelo de dados conceptual local
- Estruturas que possam ser implementadas computacionalmente, a mais usual é o **modelo de dados relacional**
- Conversão das entidades em tabelas base, todas as entidades base num modelo conceptual dão origem a uma tabela
- Os relacionamentos definidos no modelo conceptual são mapeados através da realização de operações de transformação estabelecidas de acordo com a sua cardinalidade e atributos associados. Ex: “Remover” relacionamentos M:N, com ou sem atributos


### Derivação Relacionamentos

O processo de derivação passa por descrever como as relações são derivadas para as
seguintes estruturas que podem ocorrer num modelo de dados concetual:

- Entidades Simples
- Atributos multivalor
- Entidades Fracas
- Relacionamentos binários de um-para-muitos (1:N)
- Relacionamentos binários de muitos-para-muitos (N:M)
- Entidade Relacionamento
- Relacionamentos binários de um-para-um (1:1)
- Relacionamentos binários recursivos de um-para-um (1:1)
- Relacionamentos complexos
- Relacionamentos superclasse/subclasse

#### Entidade Simples

- Dá origem a uma relação/tabela que inclua todos os atributos simples dessa entidade.
- No caso de atributos compostos, são apenas colocados os seus simples 

#### Atributos Multivalorados

- Dão origem a uma nova tabela e relacionamento 1:N com a sua tabela de referência. É usada uma nova chave primária e contêm uma chave estrangeira referente à entidade a que está associada

#### Entidades Fracas
- Uma entidade fraca não possuí uma chave primária própria mas sim uma chave parcial (Um ou mais atributos que **ajudam** na identificação, mas **não bastam**), está dependente de uma entidade forte através de um relacionamento identificador
- A sua **chave primária final é composta**: (chave da entidade forte + chave parcial)
- Exemplo: a entidade capítulo é fraca estando dependente de uma entidade livro
#### Relacionamentos 1:N

- Mais comum em modelos conceptuais de base de dados
- O mapeamento deste tipo de relacionamento para um esquema lógico gera um atributo em vez de uma tabela na tabela da entidade com cardinalidade(N)
- O atributo que sustenta o relacionamento é designado por **chave estrangeira** ou externa e permanece no filho

![[2025-05-22_21:57:10.png]]
#### Relacionamentos M:N

- O relacionamento M:N será substituído por dois relacionamentos 1:N para a nova “entidade”
- Esses relacionamentos dão origem a uma nova tabela auxiliar cuja chave primária é uma chave composta por as foreign keys de ambas as entidades

![[2025-05-22_21:57:51.png]]
#### Relacionamentos 1:1

- Podemos identificar por vezes duas entidades que representam o mesmo objecto
- As duas entidades devem ser transformadas numa única entidade
- Se as chaves primárias forem diferentes, dever-se-á escolher uma delas para ser a chave primária ficando a outra como chave alternativa.

![[2025-05-22_22:07:16.png]]
#### Relacionamentos Complexos

- Definido entre três ou mais entidades
- Se um relacionamento complexo estiver representado num modelo conceptual, dever-se-á decompô-lo para se identificar uma “entidade” intermédia e estabelecendo tantos relacionamentos binários (1:N) quantos os requeridos por essa nova “entidade”

#### Relacionamentos Redundantes

- Informação que pode ser obtida através de outros(s) relacionamento(s)
- São desnecessários e devem ser removidos
### Normalização

- Utilizada para melhorar o modelo de dados, evitando duplicação dos mesmos
- Garante consistência, baixo grau de redundância e grande estabilidade

### Análise de Interrogações

 - **Queries** -> ações de exploração da base de dados 
 - **Mapa de interrogações**, que mapeia sobre o esquema da base de dados

Permite-nos identificar:
- potenciais pontos de estrangulamento.  
- queries menos bem projetadas.  
- necessidade de criar ou eliminar atributos derivados.  
- criação de índices

### Análise de Transações

- Assegurar que o modelo desenvolvido suporta as transações requeridas pela vista de utilização, definidas com base na especificação dos requisitos dos utilizadores.
- Mapa de transações


- **Restrições de Existência** -> chave candidata ou estrangeira poderá ser inserida, modificada ou apagada
- **Restrições de Integridade** :
	-> Exigência de dados - alguns atributos devem conter sempre um valor válido, isto é não devem aceitar valores nulos
	-> Integridade de Entidades - chave primária de uma relação não pode admitir valores nulos

- **Restrições de domínios de atributos** -> qualquer atributo tem um domínio de valores que lhe podem ser atribuídos
- **Integridade referencial** -> Se uma chave estrangeira contém um valor, esse deve de existir na relação pai
- **Restrições da organização** -> regras da própria organização, regularmente aplicadas para regulamentar as suas próprias atividades

