- **File:** a linear array of bytes that can be read and written
	-> User know high-level user-readable name of file
	-> Low level nade is the inoded number (i-number)
	
- **Directory:** a container of files and other directories (also identified by a low-level i-number)
	-> By placing directories within directories, one can build directory trees (or directory hierarchies)
	-> A file absolute pathname is the full path from the root directory until that file (e.g., /bar/foo/bar.txt)

- A **File Descriptor (FD)** is an integer that can be used to **read** and/or **write** the file
- Each process maintains an array of file descriptors (also referred to as file descriptor table)
- When a process starts running, this **process table already has standard FDs initialized** for:

![[2025-05-26_16:48:32.png]]

- In most cases, **processes do not share open file table's entries**.
- The open file **table entry maps to an inode entry** (identified by its i-number) 

![[2025-05-26_16:52:24.png]]

- Files can be done through the mmap() system call. It maps the file into memory  so that it can be manipulated with memory instructions


### Multiple File Descriptors

- To read the full content of the file one can issue another open() call
- The **inode is shared across the two file table entries**

![[2025-05-26_16:54:37.png]]

- **lseek() does not perform a disk seek**. It only changes the offset variable in the file table entry. A **disk seek is performed when accessing sectors in distinct tracks**
- **Unrelated processes opening the same file** have their **own file table entries (inode is shared)**
- When a process calls fork(), the **child process has its own array of file descriptors** but **shares the open file table entry with the parent**
- multiple **related processes** reading, writing, and seeking a file, **may update the offset  field concurrently**

![[2025-05-26_16:59:56.png]]

unlink → deletes the inode when the number of references to it reaches 0
- If the machine crashes, buffered data gets lost
- The int `fsync(int fd)` call **forces the FS to write all dirty data of a given file**
- The `stat()` and `fstat()` system calls allow checking metadata about a file, given its filename or descriptor, respectively
- **Directories cannot be written to**. These are updated indirectly by creating files or other directories in it
- Files and directories are **shared across several users**  
- **Permission bits (rw-r—r--)** allow specifying what the owner of the file, someone in a group, and other users can do
- Strace is a program to trace system calls, useful for observing what OS services the program is requesting
- To make a file system, most FSs provide a tool usually referred to as `mkfs`
- The mount command (which internally uses the `mount()` system call) takes an existing  directory as the target mount point (i.e., the directory where the file system is attached to and made available to the system)

#### Very Simple File System (vsfs)

- Two important aspects to a file system:
	->**Data structures:** what on-disk structures are used by the FS to organize its data and metadata  
	-> **Access methods:** How are calls like open(), read(), write(), etc mapped to these data structures

- The disk is organized as an **array of blocks**
	-> The **data region** holds data from the user and applications (e.g., files’ content)  
	->The **metadata region** holds meta-information about files, and the file system (where the **inode table** is stored)

- The **meta data region** also has two simple **bitmaps**, one for inodes and another for data blocks
- The first block at the metadata region holds the **superblock** that keeps information about the FS organization (e.g., the number of inodes and data blocks, where the bitmaps and inode table begin, …). When mounting the file system, the OS will read the superblock first

- **Disk layout**: divided into blocks (data + metadata regions). 
- **Inodes**: store file metadata and pointers to data blocks.
- **Bitmaps**: track free inodes and blocks.
- **Superblock**: stores global FS info (locations of inodes, bitmaps).

- Since the **inode table** is located in a fixed disk region, it is easy to quickly find the  information from the disk for a given inode. Inode means **index-node**

![[2025-05-26_19:21:58.png]]

- Directories also have inodes stored somewhere in the inode table. The inode type is marked as a directory instead of a regular file

#### Inode Block Management

- **Direct pointers**: for small files.
- **Indirect pointers**: for larger files (single, double, triple).
- **Extents**: contiguous block sequences (used in ext4, XFS).

#### Virtual File System (VFS)

- Abstract layer for multiple file systems (ext4, NFS, ZFS).
- Allows applications to access files uniformly.
- Manages inode caches, page cache, and file operations.

#### Crash Consistency

- File updates involve multiple writes (inode, block, bitmap).
- **Risks**: power loss may cause inconsistencies (e.g., garbage pointers, space leaks).- **Solutions**:
    -> **fsck**: checks and repairs file systems.
    -> **Journaling**: logs updates before committing them (used in ext4).
    -> **Log-structured FS**: uses copy-on-write (e.g., ZFS).

#### Virtual File System (VFS)

- Abstract layer for multiple file systems (ext4, NFS, ZFS).
- Allows applications to access files uniformly.
- Manages inode caches, page cache, and file operations.