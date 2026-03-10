#### ssize_t read(int fd, void* buf, size_t nbyte)
#### ssize_t write(int fd, const void* buf, size_t nbyte)

○fd: the file descriptor  
○ buf: buffer with content to be written/read  
○ nbyte: number of bytes to write/read from the buffer¹  
○ Returns: number of bytes written/read (or -1 on errors)

#### int open(const char* pathname, int oflag [, mode])

○ pathname: absolute or relative pathname  
○ oflag - opening mode(s)  
	■ O_WRONLY, O_RDONLY, O_RDWR - open for writing, reading, or both, respectively  
	■ O_CREAT - create file if it does not exist  
	■ O_TRUNC - truncate file to zero length  
	■ O_APPEND - write data to the end of the file  
○ mode - file permissions (required with O_CREAT)  
	■ 0600 - owner of the file can read/write  
○ Returns: file descriptor (or -1 on errors)

#### off_t lseek(int fd, off_t offset, int whence)

○ fd: the file descriptor  
○ offset: the number of bytes to move forward or backward (it can be negative)  
○ whence: from where to move:  
	■ SEEK_SET - from the beginning of the file  
	■ SEEK_END - from the end of the file  
	■ SEEK_CUR - from the current offset  
○ Returns: the resulting offset at the file or -1 on error

#### int close(int fd)  

○ fd: the file descriptor  
○ Returns: 0 on success or -1 on error

![[2025-04-24_18:16:54.png]]

**Inode is not deleted!**
#### int unlink(const char* pathname)  

○ pathname: absolute or relative pathname  
○ Returns: 0 on success or -1 on error  

**deletes the inode** when its #ref reaches 0  

○ Remember that multiple unrelated processes may  
have the same file opened
### Inodes 

The disk is divided into equally sized blocks, each of which can be assigned to any file.
If a file is larger tha a single blcok is put in multiple blocks.
Each file has an inode associated with it that stores which blocks make up the file.

Disk: 

| 1.       |
| -------- |
| 2. File1 |
| 3.       |
| 4.       |
| 5. File1 |


- When a file changes size it can't change write over the file in front of it, for example file2. So an inode keeps the location of this blocks of the file
-  All inodes have the same size and are stored in an array in the super block
- Inodes can store meta data (date created, size of file, # links)


| File 1 | File 2 | File 3 | ... | File1 |
| ------ | ------ | ------ | --- | ----- |

