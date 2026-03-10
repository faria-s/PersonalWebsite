
```c
fork() // cria processos
exit(int val) // termina processos(voluntariamente) 

/*
* pid_t -> valor de retorno do processo que morre
* status -> como o filho morreu, pode ser NULL
*/
pid_t wait(int status); // pai espera pela morte do processo filho


pid_t getpid(); // conhecer o seu id do processo
pid_t getppid(); // conhecer o id do processo pai

```

![[2025-04-24_19:00:31.png]]

-> Open resources of the parent-process are inherited by the child-process
-> Se o filho ler ficheiro, não começa do início mas de onde o pai parou
-> Parent and child share the open file table entry
-> reads, writes, and seeks may update the offset field concurrently!

```c
pid_t p = fork();

if (p == 0){ // filho
	(...)
	_exit(0);
}

else if(p > 0){
	wait(NULL);
	(...)
} // pai

```

-> filho depois de fazer o destinado termina voluntariamente; Para o terminar bem colocar **_exit(0)**, por convenção termina mal **_exit(1)**

-> exit - intenção e terminar o programa, pode nunca se determinar. Não tem valor de retorno, apenas mata processo;

```c

// Testar se o programa terminou com exit:
WIFEXITED(status); // retorna 1 se o processo filho exited normalemente
WIFSTATUS(status); // Só é usado se WIFEXITED == 1,retorna o exit estado do filho
WIFSTOPPED(status); // modo de tracing/debbugging

$ unlimit -a // ver recursos alocados, parametros que o user pode mudar
$ kill PID // matar processo
```

![[2025-04-24_18:51:23.png]]

```c
/*
○ Returns:  
	■ the PID of the child-process to the parent process  
	■ 0 to the child-process  
	■ -1 on error
*/
pid_t fork(void)  

/*
○ status: status of the current process when exiting  
	■ 0: the process exited normally
*/
void _exit(int status)  

/*
○ status: memory address where termination information of the child-process is written to  
○ Returns: the PID of the terminated child-process
*/
pid_t wait(int *status)

/*
○ pid:  
	■ > 0: wait for the child process whose PID is pid  
	■ check wait’s man page for other wait behaviours that one can specify with pid  
○ wstatus: memory address where termination information of the child-process is written to  
○ options: extra arguments that change waitpid’s default behavior
*/
pid_t waitpid(pid_t pid, int * wstatus, int options)
```