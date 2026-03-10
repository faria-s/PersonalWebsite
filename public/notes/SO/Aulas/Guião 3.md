-> Não se escreve nada após exec a não ser mensagens erro.
-> Um exec bem usado recicla o espaço de código e dados substituindo com novos
-> fork -filho é uma cópia do pai (dados,etc.)
-> exec - filho tem novos dados
-> Parent and child have the same program code
-> Heap and Stack are re-initialized 

```c
int main(){
	pid_t pid = fork(;

	if(pid == 0){
		execl(...);
	}

	_exit(1);
	perror(...);
}
```

-> execlp - sabemos os comandos a executar
-> execvp - não sabemos(ex: criador bash - só sabe em tempo real que comando o user vai correr)

```c
int execl(const char *pathname, const char *arg0, …, NULL); // arg0 -> name program being executed

int execlp(const char *file, const char *arg0, …, NULL);

int execv(const char *pathname, char *const argv[]);

int execvp(const char *file, char *const argv[]);

//EX:

/*
* wc in the second argument is the given name by the programmer
* could have another, dosen't change the behauviour of the program
* For example "fazIsto" isntead of wc
*/
execlp(“wc”, “wc”, ”exec.c”, NULL);

// without the suffix 'p', execl needs the path to ‘wc’
execl(“/usr/bin/wc”, ”wc”, ”exec.c”, NULL); 

// receives array of arguments
char* args[3];
args[0] = strdup(“wc”);  
args[1] = strdup(“exec.c”);  
args[2] = NULL;  
execvp(args[0], args);

// -> Functions only return on error
// -> Arguments must be terminated by a null pointer
```

Exec Suffixes:
-> **l**- program arguments passed **as arguments** to the exec function
-> **v** - program arguments passed **as a vector(array)** to the exec function
-> **p** - search for the program in the **PATH variable**, otherwise provide the program path(not simply the name)

![[2025-04-24_20:14:55.png]]