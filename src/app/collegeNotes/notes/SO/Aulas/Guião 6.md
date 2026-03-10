```c
/*
* fd: the file descriptor 
* Returns: a new file descriptor referring to the 
* same open file table entry as fd  (-1 on errors)
* 
* - chooses lowest-numbered available descriptor  
* - preserves original mode and position of fd
*/
int dup(int fd);

/*
* oldfd: the file descriptor
* newfd: the file descriptor to refer 
* to the same open file table entry as oldfd  
* Returns: the new file descriptor (newfd) or -1 on errors
*
* - if newfd is open, dup2 closes it implicitly  
* - preserves original mode and position of oldfd
*/
int dup2(int oldfd, int newfd);
```