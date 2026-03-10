
- **Important information to run/resume processes** that are Ready to execute is **kept in main memory**
- The memory state of a process is kept at the **Address Space**
	-> **Code:** the instructions of the program
	-> **Stack:** local variables, arguments of routines, return values
	-> **Heap:** dynamically allocated memory

## Memory API

**Stack** → allocations and dellocations are handled by the compiler
**Heap** → allocations and *dellocations* are handled by the programmer explicitly

**Malloc**:
	-> allocates memory dynamically accordingly to the size passed as an argument
	-> forgetting to allocate memory may lead to **segmentation fault**
	-> not allocating enough memory may lead to **buffer overflow**
	-> forgetting to initialize allocated memory may lead to **program bugs**

**Free**:
	-> returns previously allocated memory that is no longer being used
	->freeing memory before being done with leads to **crashes or overwrites in invalid memory**
	->freeing memory repeatedly leads to **double free**
	-> calling free() incorrectly leads to **craches or freeing other allocated memory**

- malloc() and free() are not system calls, are **library calls**, build on top of system calls such as brk and sbrk that change the size of heap

### Virtualizing Memory

- The address space of Process A is not really loaded into physical memory at addresses 0 to 64KB  
	-> When Process A accesses address 0 (**virtual address**), the request is mapped to address 192KB at main memory (**physical address**)

![[2025-05-25_18:55:25.png]]

- The **Goals of the OS** are:
	-> **Transparency**: Each process behaves as if it has its own private  physical memory, not knowing it is being virtualized
	-> **Efficiency**: Memory virtualization must be efficient in terms of performance and space
	-> **Protection**: Processes cannot access/modify memory regions from other processes or the OS

- To **ensure transparency** each memory access (e.g., fetch, load, store) done by a process uses a **virtual address** that must be **translated, by the hardware**, into the  corresponding **physical address** (i.e., actual location in memory)
- The **OS is responsible for instructing the hardware** to do the correct translations, managing memory, and protecting processes from each other

### Base and Bounds (or Dynamic relocation)

- The CPU has two additional register, the **base** and the **bounds** that help with address translation and are kept at the **Memory Management Unit (MMU)**
- The **memory virtualization illusion** created by the OS consists of each program being written and compiled as if its loaded at address 0, but actually when the program starts the OS sets the **base register** where it decides to load it in **physical memory.**
- For **each memory access** made by the program, **virtual addresses are translated into physical ones**, by the processor, in the following way

$$
Physical\:address = Virtual \: address + Base
$$

- The **bounds register** helps protecting the address space limits of processes
- The processor first checks if the memory is within **bounds** and if not sets a out of bounds exception trap.
- Given that the translation is done in runtime, a process's address can be **dynamically reallocated**. The OS copies its address to another physical location.
- Base and bounds registers must be **saved and changed when processes are switched**

### Internal Fragmentation

- Placing address space contiguously in physical memory leads to **internal fragmentation**, wasted memory inside the address space of a process. Allocating a fixed sized block of memory to a process that doesn't use all of it. 
	Ex: Supposing that the OS uses fixed-size memory blocks of 4KB
		-> A process needs 3.2KB
		-> The unused space 0.8KB is internal fragmentation

![[2025-05-26_01:04:41.png]]

### Segmentation

- Supposing that address space ain't stored contiguously but instead each logical **segment** (code,heap,stack) is placed at **different physical memory region**.
- Each segment can be **realocated** across memory as the system runs
- **Context Switching** requires saving and restoring these several base and bounds registers.

![[2025-05-26_01:08:41.png]]

- For the hardware to know the **segment** and **offset** of a virtual address it uses the **top bits of the virtual address** (EX: 00 - code, 01 - heap, 10 - stack)
- The offset must be within bounds, in this case the between 0-4096 bytes


![[2025-05-26_01:08:12.png]]
- **Segment Number** → tells the hardware which segment (Code, Heap, stack)
- **Offset** → tells the location within the segment
- The hardware splits the virtual address into these two parts to :
	-> Identify the correct base address using the **Segment Table**
	-> and the offset to the base to get the final physical address
	-> Check if the offset is within bounds to prevent a segmentation fault
- **Stack grows backwards**, in the example goes from from physical address 132KB to 128KB

- Shared segments can happen across multiple processes, for example libraries code shared by multiple programs
- Each process has its own registers
- Protection bits(EX: read only in file opens)
- **Coarse-grained segmentation** is a memory management strategy where each **segment is relatively large**
- **Fine-grained segmentation** has smaller segments and requires a segment table for translating the segments physical addresses

### External Segmentation

- Since segments vary in size, physical memory can quickly be filled with several little holes, leading to external fragmentation
- Constantly stopping and realocating memory is costly so we use a **free list management strategy**

#### Free List

- A **free list** contains the **addresses** and **length** of free chunks at physical memory
- Each node represents a **free memory block** with its size and a pointer to the next free block
- Used by allocators like `malloc` to find space for new allocations.

**Splitting:**
- When a **large free block** is found for an allocation request, it may be **split** into:
	-> One part that satisfies the request
    → Another smaller block that remains on the **free list**
	EX:
		Request = 100 bytes  
		Free block = 256 bytes  
		→ Split into 100 bytes (allocated) + 156 bytes (free)
- Prevents **internal fragmentation** 

**Coalescing:**
- When **free blocks are adjacent in memory**, they can be **merged** (coalesced) into one larger block.
- prevents **external fragmentation** and reduces smaller unusable free blocks
- usually done when:
	-> a block is freed
	-> periodically by the allocator

- The **free list** is stored in **heap memory itself** — specifically, **within the free blocks** it manages.
- Each **free block** contains a small header including its size and pointer to the next free block, making the free list self contained

 **Best Fit:**
- Go through the list and find the **smallest chunk that fits the requested size**

**Worst Fit:**
- Go through the list and find the **largest chunk that fits the requested size**
- Leads to excess external fragmentation

**First Fit:**
- Best and Worst fit strategies requires going through the full list to find a candidate.  This may take some time
- First fit looks for the **first free chunk that is large enough** to accommodate the request
- fast but, leads to severe external fragmentation thorugh many splliting

**Next fit:**
- Next fit looks for the **first free chunk that is large enough** to accommodate the request, but records the last chunk being split at the free list. When a new allocation is needed, the search starts from such position onwards.
- Avoids small fragments at the list’s beginning

#### Segregated Lists

- **Slab Allocator** is a **memory management** technique used in operating systems to **efficiently allocate memory for objects of the same size**, by preallocating memory chunks(slabs) for specific object types. Reducing memory fragmentation and speeding up allocation.
- **Slab** → A chunk of contiguous memory preallocated for storing objects of one type (e.g., task structs, file descriptors)


#### Buddy Allocation

- **Buddy allocation** is a **memory management algorithm** that efficiently allocates and frees memory in **blocks that are powers of two**. It's commonly used in operating systems (e.g., Linux kernel) for allocating **physical pages** or managing large contiguous memory regions.

![[2025-05-26_02:36:25.png]]![[2025-05-26_02:36:47.png]]![[2025-05-26_02:36:54.png]]![[2025-05-26_02:37:07.png]]