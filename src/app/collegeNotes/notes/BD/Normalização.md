
- **Cada registo** numa tabela deve representar **uma entidade ou uma instância de um relacionamento**.  
- A **referenciação de outras entidades apenas** deve ser realizada através de **chaves estrangeiras**.  
- Os **atributos das entidades e dos relacionamentos** devem ser mantidos, tanto quanto possível, **à parte**.  
- O desenvolvimento de um esquema deve poder ser explicado tabela a tabela.

- **Misturar atributos** de várias entidades pode originar variadíssimos problemas – e.g. gastar maior espaço de armazenamento com informação redundante ou ter que lidar com anomalias de atualização de dados.

## Anomalia

- Uma **anomalia de inserção** ocorre quando não se é capaz de se inserir um dado registo numa tabela por causa da inexistência de outros dados. (EX: Tentar inserir um registo com um valor NULL num atributo que não aceita valores nulos)

![[2025-05-23_14:10:27.png]]


- Uma **anomalia de atualização** sucede quando se atualizam apenas alguns elementos de dados (atualização parcial) contidos numa base de dados, que estão replicados numa ou em mais tabelas – situação que conduz a base de dados a um estado inconsistente.

![[2025-05-23_14:10:19.png]]

- Uma **anomalia de remoção** ocorre quando se perde informação base por causa da remoção de um ou outro registo numa mesma tabela.

![[2025-05-23_14:10:40.png]]

## Decomposição

- Os **atributos** de uma dada tabela que contenham **frequentemente valores nulos** devem ser avaliados no sentido de serem colocados numa outra tabela com a mesma chave primária
- Um **processo de decomposição** de uma dada tabela origina um novo conjunto de tabelas deve, que deve respeitar as seguintes propriedades:  
	–> Decomposição sem perdas (**loss-less join**) – garante-nos que o um esquema derivado a partir do esquema original contém a mesma informação que este último.  
	–> Preservação de Dependências (**dependency preservation**) – as dependências funcionais das tabelas do esquema original devem-se verificar também no esquema derivado

## Formas Normais

- Uma tabela **não está normalizada** se contiver um ou mais grupos de dados repetidos e se se verificar a possibilidade de ocorrência de uma série de anomalias que podem conduzir a própria base de dados a um estado de inconsistência
- As **dependências funcionais** determinam a forma como se pode interpretar e relacionar os dados e **permitem especificar medidas formais sobre a correção dos esquemas relacionais**.
- **Para cada valor de A1**, **existe apenas um valor possível para A2**, por isso diz-se que **A2 é funcionalmente dependente de A1** ou que **A1 determina funcionalmente A2**;  
- **Valores iguais para A1**, determinam **valores iguais para A2**.

![[2025-05-23_14:42:24.png]]

### 1 FN

- Todos os valores dos seus atributos têm de ser atómicos(Não são permitidos atributos que implicitamente codificam subatributos (atributos compostos) ou atributos multivalorados)
- Cada tabela tem uma chave primária
- Não existem grupos de valores repetidos

1 - each row is unique
2 - no cell has more than one value
3 - there are no repeating groups

**Aplicação da 1FN:**
	_Passo 1_: Uma das chaves candidatas é escolhida para chave primária.
	_Passo 2_: Atributos multivalor são convertidos em novas relações com chave externa referindo a chave primária da tabela original.
	_Passo 3_: Cada atributo composto é mapeado em vários sub-atributos atómicos

### 2 FN

- Tanto a 2FN com a 3FN (que veremos de seguida) foram definidas para **evitar anomalias** que ocorrem em processos de **atualização**
- Permite aumentar a eficiência no armazenamento de dados e reduz a repetição de dados
- Todos os seus atributos não-primos forem totalmente dependentes da sua chave primária. Isto é, **não podem existir dependências parciais** (A1->A2 - valores iguais para A1 implicam valores iguais para A2). Diz-se que um atributo é não-primo quando este não faz parte de uma chave primária
- Um **atributo não primo  não faz parte de nenhuma chave candidata** de uma relação (tabela). Ex: Aluno(Nr, Nome, Email, Curso)
	- Chaves candidatas (atributos primos) = Nr, Email
	- Artributos não primos = Nome, Curso
- Nenhum **atributo não primo** pode depender **parcialmente** de uma chave candidata.

Alunos(**id_aluno**, nome_aluno, cod_curso, nome_curso)
Notas(**id_aluno, cod_dis**, nome_dis, nota, cod_prof, nome_prof, dep_prof)
Disciplinas(**cod_dis**, nome_dis, cod_prof, nome_prof, dep_prof)

As notas não estão na 2FN uma vez que possui os dados todos presentes na tabela Disciplinas

Notas(**id_aluno, cod_dis**, nota) 

All data must depend on a primary key

| Employee Id | Skill Id 1 | Skill name1   | Skill id 2 | Skill name2 |
| ----------- | ---------- | ------------- | ---------- | ----------- |
| 1           | 10         | sales         | 23         | finace      |
| 2           | 11         | communication | 3          | marketing   |
Employee id should be a foreign key of the two tables Skill id1 and skill id 2, given that the skill name depend on the skill Id and not on the employee id

| Employee Id | Skill Id |
| ----------- | -------- |
| 1           | 10       |
| 1           | 23       |
| 2           | 11       |
| 2           | 3        |

| Skill id | Skill Name    |
| -------- | ------------- |
| 3        | marketing     |
| 10       | sales         |
| 11       | communication |
| 23       | finance       |

### 3 FN

- Dependências Transitivas
- Todos os atributos dependem única e exclusivamente da chave primária
- Os atributos que não dependam da chave primária devem ser “eliminados” da relação,ou seja, devem ser transferidos para outra tabela
- Nenhum **atributo não primo** pode depender **transitivamente** de uma chave candidata.

- dependência funcional **A1 →A2, A3 e A3 →A4**
- Existe uma **dependência funcional transitiva entre A1 e A4**. Ou seja os atributos que não são chave primária, não são mutuamente independentes entre si


Alunos(**id_aluno**, nome_aluno, cod_curso, nome_curso)
Notas(**id_aluno**, cod_dis, nota)
Disciplinas(**cod_dis**, nome_dis, cod_prof, nome_prof, dep_prof)

As tabelas alunos e disciplinas não estão na 3FN:

Alunos(**id_aluno**, nome_aluno, cod_curso)
Disciplinas(**cod_dis**, nome_dis, cod_prof)
Cursos(**cod_curso**, nome_curso)
Professores(**cod_prof**, nome_prof, dep_prof)

The primary key must fully define all Non-Key columns and Non-key columns must not depend on any other key

| Employee Id | Name         | Address | Job Name            |
| ----------- | ------------ | ------- | ------------------- |
| 1           | Roger Martin | ...     | sales represenative |
| 2           | Amy Kim      | ...     | adminstrative       |

Job name should have its own column

| Job id | Job Name             |
| ------ | -------------------- |
| 10     | sales representative |
| 100    | adminstrative        |

| Employee Id | Name         | Address | Job Id |
| ----------- | ------------ | ------- | ------ |
| 1           | Roger Martin | ...     | 10     |
| 2           | Amy Kim      | ...     | 100    |


### Diferença entre 2FN e 3 FN

Na 2FN, dependências parciais dependem da chave parcialmente da primária
Na 3FN, dependências transitivas não dependem da chave primária


Matrícula(**AlunoID, DisciplinaID,** NomeAluno, NomeDisciplina, Curso)

NomeAluno  depende parcialmente da chave primária composta - AlunoID
NomeDisciplina depende parcialmente da chave primária composta - DisciplinaID

Usando a 2FN separam-se:
- Aluno(**AlunoID**, NomeAluno)
- Disciplina(**DisciplinaID,** NomeDisciplina)
- Matrícula(**AlunoID, DisciplinaID**)

Aluno(**RA**, Nome, CursoID, NomeCurso)

NomeCurso não depende diretamente da chava primária RA, mas sim do CursoID

Usando a 3FN, separam-se:
- Aluno(**RA**, Nome, CursoID)
- Curso(**CursoID**, NomeCurso)