## Comandos Básicos

**INSERT**→ Inserir dados da BD;

```sql
INSERT INTO <nome_tabela> (<c1>,<c2>,...) 
	VALUES (<v1>,<v2>,...);
```

**SELECT** → Listar dados da BD

```sql
SELECT [DISTINCT] {* , <nome_c1>, …} 
	FROM <nome_tabela>
```

**DELETE** → Eliminar dados da BD

```sql
DELETE FROM <nome_tabela> WHERE <condição>;
```

**UPDATE** → Atualizar dados da BD

```sql
UPDATE <nome_tabela>
	SET
	<c1> = <v1>,
	<c2> = <v2>,
	...
	[WHERE <condição>];
```
## Vistas

Uma vista é uma **tabela virtual derivada de uma ou mais tabelas ou vistas existentes**. É definida por uma query SQL e **tem a aparência de uma tabela**, mas **não armazena nenhum dado**. Em vez disso, **recupera os dados dinamicamente** das tabelas/vistas subjacentes sempre que é consultada.

```sql
CREATE VIEW vw_medication_stats AS
	SELECT m.nome as 'Medicamento',
	COUNT(*) as 'Nr de vezes prescrito',
	SUM(quantidade) as 'Quantidade Total',
	ROUND(AVG(quantidade),0) as 'Quantidade Média',
	MAX(quantidade) as 'Quantidade Máxima',
	MIN(quantidade) as 'Quantidade Mínima'
		FROM medicamentos m
			INNER JOIN prescricoes p USING (id_med)
				GROUP BY m.nome;
```

## Procedimentos

Um procedimento é uma coleção de instruções SQL pré-compiladas armazenadas na BD que mais tarde podem ser invocadas.

```sql
DELIMITER &&
CREATE PROCEDURE <procedure_name> ([IN | OUT | INOUT] parameter_name parameter_datatype)
BEGIN
	Declaration_section
	Executable_section
END &&
DELIMITER
```

- **IN** - É o modo padrão, permite passar parâmetros de entrada. Tipo de Parâmetro
- **OUT** - É usado para passar um parâmetro como saída. O seu valor pode ser alterado dentro do procedimento armazenado e o valor alterado (novo) é passado de volta para o programa que invoca o procedimento.
- **INOUT** - É uma combinação dos modos IN e OUT.

Podemos criar um procedimento sem parâmetros. A rotina a baixo descrita é um procedimento que retorna todos os médicos do hospital.

```sql
DELIMITER &&
CREATE PROCEDURE GetMedicos()
BEGIN
	SELECT * FROM medicos;
END &&
DELIMITER;

CALL GetMedicos();
```

## Funções

Uma função é um programa armazenado que devolve um único valor. Tipicamente, usam-se funções para encapsular fórmulas ou regras de negócio comuns que são reutilizáveis entre instruções SQL ou programas armazenados.

```sql
DELIMITER &&
CREATE FUNCTION <function_name> (parameter_name parameter_datatype)
RETURNS datatype [NOT] DETERMINISTIC
BEGIN 
	Body_section
END &&
DELIMITER;
```

- Uma função **determinística** retorna sempre o mesmo resultado para os mesmos parâmetros de entrada
- **parameter_datatype**- tipo de dados e tamanho do parâmetro
- **body_section** - é preciso especificar pelo menos uma instrução RETURN

EXEMPLO: Função Idade
```sql
DELIMITER &&
CREATE FUNCTION idade (dta DATE)
RETURNS INT
NOT DETERMINISTIC
BEGIN
	RETURN TIMESTAMPDIFF(YEAR, dta, CURDATE());
END &&
DELIMITER ;
```

## Trigger

Um trigger é invocado automaticamente quando uma operação de alteração específica (instrução INSERT, UPDATE, ou DELETE) é executada sobre uma determinada tabela. Os triggers são úteis para tarefas como a aplicação de regras comerciais ou até para validação de dados quando inseridos na base de dados.

```sql
DELIMITER &&
CREATE TRIGGER <trigger_name> {BEFORE | AFTER} {INSERT | UPDATE | DELETE}
ON <table_name> FOR EACH ROW
[{FOLLOWS | PRECEDES} existing_trigger_name]
BEGIN
	Body_section
END &&
DELIMITER;
```


- **FOLLOWS** - permite que o novo trigger seja ativado após um trigger existente.
- **PRECEDES** - permite que o novo trigger seja ativado antes de um trigger existente.

```sql
DELIMITER //
CREATE TRIGGER update_nrconsultas
AFTER INSERT ON consultas FOR EACH ROW
BEGIN
	DECLARE id_esp INT;
	SELECT e.cod_especialidade INTO id_esp FROM consultas c
		INNER JOIN medicos m ON m.nr_mec=c.id_medico
		INNER JOIN especialidades e USING(cod_especialidade)
		WHERE c.nr_episodio=NEW.nr_episodio;
		UPDATE especialidades SET nr_consultas=nr_consultas+1
			WHERE cod_especialidade=id_esp;
END //
DELIMITER ;
```


## Eventos

- Criar eventos de acordo com um schedule

```sql
CREATE EVENT myevent
    ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 1 HOUR
    DO
      UPDATE myschema.mytable SET mycol = mycol + 1;
```

```sql
DELIMETER &&

CREATE EVENT e
    ON SCHEDULE
      EVERY 5 SECOND
    DO
      BEGIN
        DECLARE v INTEGER;
        DECLARE CONTINUE HANDLER FOR SQLEXCEPTION BEGIN END;

        SET v = 0;

        WHILE v < 5 DO
          INSERT INTO t1 VALUES (0);
          UPDATE t2 SET s1 = s1 + 1;
          SET v = v + 1;
        END WHILE;
    END &&
    
DELIMETER
```
## Funções de Data

- **CURDATE** – Retorna a data atual;
- **NOW/ SYSDATE** – Retorna a data e hora atuais;
- **DAY** - Obtém o dia do mês de um DATE/DATETIME;
- **DAYOFWEEK** – Obtém o índice do dia da semana de um DATE/DATETIME;
- **MONTH** - Retorna um inteiro que representa o mês de um DATE/DATETIME;
- **WEEK** - Retorna um número de semana de um DATE/DATETIME;
- **WEEKDAY** - Retorna um índice de dia da semana para um DATE/DATETIME;
- **YEAR** - Retorna o ano de um DATE/DATETIME;
- **HOUR** – Retorna a hora de um DATETIME/TIME;
- **MINUTE** – Retorna os minutos de um DATETIME/TIME;
- **SECOND** – Retorna os segundos de um DATETIME/TIME;
- **DATEDIFF** - Calcula o número de dias entre dois valores DATE/DATETIME;
- **DATE_ADD** - Adiciona um valor de tempo a um valor DATE/DATETIME;
- **DATE_SUB** – Subtrai um valor de tempo a um valor DATE/DATETIME;
- **DATE_FORMAT** - Formata um valor de data com base em um formato de data especificado;
- **STR_TO_DATE** - Converte uma string num valor de data e hora com base num formato especificado;
- **TIMEDIFF** - Calcula a diferença entre dois valores DATETIME/TIME;
- **TIMESTAMPDIFF** - Calcula a diferença entre dois valores DATE/DATETIME

## Funções Numéricas
- **ABS()** - Retorna o valor absoluto de um número
- **DIV ()** - Realiza a divisão entre dois números e retorna o inteiro quociente
- **MOD()** Retorna o resto de um número dividido por outro
- **ROUND()** - Arredonda para um número de casas decimais especificado
- **DEGREES(n)** - Converte radianos para graus de um argumento n
- **EXP(n)** - Retorna e elevado à potência do número específicado

## Funções Exploração

- **ORDER BY** - A cláusula ORDER BY permite que as linhas sejam apresentadas por ordem ascendente (ASC) ou decrescente (DESC)

```sql
SELECT * 
	FROM procedimentos 
		ORDER BY preco DESC;
```

- **GROUP BY** - pode ser usado em alternativa a DISTINCT ou em conjunto com funções de agregação (AVG, COUNT, SUM, MAX, MIN, etc.)

```sql
SELECT localidade 
	FROM pacientes
	 GROUP BY localidade;
```

```sql
SELECT e.des_especialidade, MAX(c.custo_final) as preco_max
	FROM consultas c, especialidades e, medicos m 
		WHERE m.nr_mec = c.nr_mec_medico 
			AND m.cod_especialidade = e.cod_especialidade
			 GROUP BY e.des_especialidade;
```


## Junções

#### NATURAL JOIN
- operação de Junção Natural, é uma operação entre duas relações R e S que permite inter-relacionar essas duas relações através das colunas que sejam comuns às duas relações e que possuam valores iguais.

![[2025-06-11_15:08:35.png]]

#### INNER JOIN
- A operação de Junção Interna, é uma operação entre duas relações R e S que permite inter-relacionar essas duas relações através das colunas que satisfaçam a expressão predicativa.

![[2025-06-11_15:08:54.png]]

#### LEFT JOIN
- A operação de Junção Externa à Esquerda (Outer Left Join), integra na relação final todas as tuplas da relação à esquerda, mesmo quando estas não obedecem aos critérios de junção definidos. 
- Ou seja, os tuplos de R que não têm correspondência nas colunas comuns de S são incluídos no resultado. 
- Quando não existem valores correspondentes na segunda relação S, apresentam-se valores nulos (NULL).

![[2025-06-11_15:09:04.png]]

- É possível selecionar apenas as tuplas da relação R que não têm correspondência na relação S usando a cláusula WHERE e o operador IS NULL.
![[2025-06-11_15:09:15.png]]


#### RIGHT JOIN

- A operação de Junção Externa à Direita (Outer Right Join), é semelhante Junção Externa à Esquerda, exceto que o tratamento das tabelas unidas é invertido. 
- Ou seja, integra na relação final todas as tuplas da relação à direita, mesmo quando estas não obedecem aos critérios de junção definidos. 
- Quando não existem valores correspondentes na primeira relação R, apresentam-se valores nulos (NULL).

![[2025-06-11_15:09:27.png]]

- É possível selecionar apenas as tuplas da relação S que não têm correspondência na relação R usando a cláusula WHERE e o operador IS NULL.

![[2025-06-11_15:26:22.png]]