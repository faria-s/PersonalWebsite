- Pipe anónimo ou com com
- Transferem informação de um processo para outro
- **Têm de ser criados antes do filho**
- Filho quando nasce herdam o pipe anónimo do pai e fecham o canal descritor que não estão a usar
- Caso o pipe não seja o criado antes do filho, o filho aponta para outro pipe, ou seja, não serve para comunicar entre processos 

![[2025-04-24_21:01:09.png]]

- FIFO, Fiável
- Sequência de bytes
- Sem preservação das fronteiras
- Semi-síncrona
- Buffer de tamanho ilimitado

SIGPIPE -> escrever num Pipe onde já ninguém pode ler (process is killed)
PIPE_BUF >= 512 bytes -> os users não podem alterar o mesmo

- Pipe tem a aparência de ficheiros
- Ficheiros não têm sincronismo
- Não determinismo, não há ordem para os filhos usarem o pipe

```c
int pipe(int pid[2])
pid[0] // Read
pid[1] // Write

// fd pid[0] or pid[1]
write(fd, buffer,buffersize);
read(fd,buffer,buffersize);
close(fd);
```

- Se vários processos escreveram no mesmo pipe:
	-> O Sistema Operativo estabelece uma ordem 
	-> Mensagens escritas concorrentemente nunca ficam entrelaçadas. Primeiro uma depois a outra
	-> Se assegurarmos que cada mensagem tem o menos de 512 bytes é necessário apenas um pipe

- Multiplexagem IO -> systemcall(select/poll)
- Se o processo se esquece de fazer close() nunca vai haver end of file (EOF). **Fechar sempre os canais de e leitura e escrita quando não são mais usados**


Anonymous Pipes :
- **Between related processes** (e.g., parent - child, children of the same parent). 
- Produced (written) **data is kept in a memory region** to be consumed (read).  
- The kernel handles writers (producers) and readers (consumers).  
- **Writers block (wait) if there is no available space, and readers block if there is no data.**
- **Data flows** in a one-way First-in First-out **(FIFO)** manner.  
- Enables **chaining of programs** without modifying them (with the help of the other system calls).  
	■ E.g., $ ls | less

```c
/*
* fildes: array populated by the function with the FDs of the write and read 
* ends of the pipe.  
* Returns: 0 on success, -1 otherwise
*/
int pipe(int fildes[2])
```

-> **Data written to fildes[1]** (write end) can be **read from fildes[0]** (read end).
-> Reading from fildes[0] reaches **EOF only when fildes[1] is closed**
-> **Processes that read from the pipe should close the write end, andvice-versa**
->**Writing to a pipe whose read end is closed results in the process being terminated**.

```c

// Parent can read data with read(fields[0],...)
// Child can wirte data with write(fields[1],...)

int main() {  
	pid_t pid;  
	int fildes[2];  
	pipe(fildes);  
	if ((pid = fork()) == 0) {  
		close(fildes[0])  
		// child process  
	} else {  
		close(fildes[1])  
		// parent process  
	}  
	return 0;  
}
```

![[2025-04-24_21:22:59.png]]