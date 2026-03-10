Named Pipes:
-  **Communication across non-related processes**  
-  Produced (written) data is **kept in a memory region** to be consumed (read).  
- The kernel handles writers (producers) and readers (consumers).  
- **Writers block (wait) if there is no available space, and readers block if there is no data.**  
- **Data flows** in a one-way First-in First-out **(FIFO)** manner.

![[2025-04-24_21:57:47.png]]

```c
/*
* pathname: absolute or relative pathname to the special FIFO file 
* mode: file permissions  
*     ■ 0600 - owner of the file can read/write  
* Returns: 0 on success, -1 otherwise
*/
int mkfifo(const char path* pathname, mode_t mode);
```

**Considerations:**  
- mkfifo creates the FIFO special file  
- Accessed through syscalls (open, close, read, write)  
	-> Explicitly removed with unlink  
	->Cannot change file pointer (lseek)  
- Unidirectional communication  
- Reads and writes block

```c
// PID 2034 (server)
int main() {  
	mkfifo("fifos/myfifo", 0666);  
	int fifo = open("fifos/myfifo", O_RDONLY);  
	char buf[BUFSIZE];  
	int n;  
	
	while((n = read(fifo, buf, BUFSIZE)) > 0) {  
	...  
	}  
	close(fifo);  
	unlink(fifo);  
}

//PID 5391 (client)
int main() {  
	int fifo = open("fifos/myfifo", O_WRONLY);  
	...  
	write(fifo, buf, BUFSIZE);  
	close(fifo);  
}
```

After mkfifo:

![[2025-04-24_22:59:20.png]]

After unlink(fifo): Deletes FIFO after all processes close it

![[2025-04-24_23:01:22.png]]

- Se houver conversa são necessários 2 servidores 
- Múltiplos clientes fazem um pedido ao mesmo tempo, o servidor responde de forma aleatória
- Para ser ordenado é necessário especificar pipe de resposta por cliente
- O open boloqueia. Só pode ter O_RDONLY O_WRONLY, que se bloqueiam um ao outro
- Os clientes antes de se ligarem ao servidor criam um respostas RC1, RC2, RC3. Não abre logo
- Servidor cria(não significa abrir fifo de pedidos(caso não exista))


![[2025-04-24_23:31:53.png]]