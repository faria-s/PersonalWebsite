- The **virtual address** space is divided into **fixed-size chunks** called **virtual pages**
- **Physical memory** is divided into fixed-size chunks, named page **frames**
- Each physical page **frame contains a single virtual page**

Advantages:
	-> **Simplicity** - of free-space management
	-> **Flexibility** - in supporting address space abstraction

- Each **virtual page address** must be translated into the corresponding **physical page frame address**
- A **page table** is used to record where each page is placed in physical memory, is a **per-process data structure**

- **Virtual Page Number (VPN**): identifies the page number (top bits)
- **Offset**: identifies the specific bytes inside the page to access

 ![[2025-05-26_03:17:37.png]]

- The **page table** is used to map the **VPN** into a **Physical Frame Number (PFN)**
- Given the sheer size of page tables, these **must be stored in physical memory** (not at the MMU)
- The **page table is an array** that maps VPNs to PFNs and each element of the array is a  **Page Table Entry (PTE) 

Contains:
→ **A valid bit** indicating whether the translation is valid
→ **Protection bits** indicating if the page can be read, written to, or executed
→ A **present bit** indicating if the page’s content resides on memory or disk1  
->A **dirty bit** indicating if the page was modified after being brought to memory1  
->A **reference bit** (aka use bit) tracks whether a page has been accessed

![[2025-05-26_03:24:34.png]]

- Every address translation now requires two accesses to main memory:
	->To the page table and to the memory requested by the process
	-> Slower than segmentation, accessing a CPU register is faster than accessing physical memory

#### Translation Look-aside Buffer (TLB)

- Component of the MMU, that is a **hardware cache** of popular virtual-to-physical **address translations**
- significantly faster than going to main memory
- When a virtual address translation is requested, the hardware must  
	1. Extract the VPN from the virtual address  
	2. Check for the VPN at the TLB
	3. If not get it from memory
- The **page size** plays an important role in the number of hits and misses
- The TLB is **fully-associative**

Each TLB entry has:
-> **The VPN** and corresponding FPN  
-> **A valid bit** indicating wether the address translation is valid  
-> **Protection bits** indicating if the page can be read, written to or executed  
-> **A dirty bit** indicating if the page was modified after being brought to memory  
-> An **address-space identifier (ASID)**, used identify different processes

![[2025-05-26_03:31:50.png]]

- **Sharing pages** across processes is possible by having different VPNs  “pointing" to the same FPN
- To avoid severe internal fragmentation, **most OSs use smaller page sizes such as 4KB and 8KB**

#### Combining Paging and Segmentation

- Each segment (code, heap and stack) has its own page table
- The **base and bounds** registers of each segment now **point to the physical address of the page table** and to the **table’s limits**, respectively.

![[2025-05-26_03:36:44.png]]

- Further, **page tables now have variable sizes**, and allocating memory for these leads to **external fragmentation**

#### Multi-level page tables
- Chop up the **linear page table into several page-sized units**
- Each unit is only allocated at physical memory (i.e., at a given frame) if it contains at least one valid PTE
- The **page directory**, is responsible for **indexing the page units**, and cointains **Page Directory Entry(PDE)** that contains a **valid bit** and a **PFN**

#### Inverted Page Table

- **one-page table shared across all processes**
- Finding the correct entry requires a linear scan through the list  
	->A hash table can be built over the base structure to speedup lookups

![[2025-05-26_03:51:24.png]]

## Summary

**Paging:**
- Divide memory into **fixed-size pages** (e.g. 4 KB)
- The virtual address space and physical memory are both split into **equal-sized blocks**:
	-> **Virtual memory → pages**
    → **Physical memory → frames**
- The OS keeps a **page table** that maps each **virtual page number** to a **physical frame number**
- Avoids **external fragmentation** but can lead to **large page tables**

**Combining Paging with Segmentation:**
- Divides the program into **logical segments** (e.g., code, heap, stack).
- Then, **each segment is paged independently**.
- A **segment table** maps each segment to a **page table**.
- Each **segment has its own page table** to translate virtual pages into physical frames.

- Allows a **logical separation**, **avoids fragmentation** and supports **protection and sharing** at segment level. But has the overhead of managing both segment and page tables

**Multi-Level Paging:**
- Break the page table into **multiple levels**, reducing memory overhead
- Stores page tables **hierarchically** and only allocates page tables when needed.

- Saves space by creating page tables **on demand** and is efficient for sparse address spaces. But has more address translations making it a bit slower

### Swapping

- What if the OS saves (**swaps**) portions of the address space (e.g., pages) that are **not in great demand**  into another **location with higher capacity**, such as the **disk device**?
- We must reserve some space,  called the **swap space** that when combined with the **physical memory space**,  dictates the **total number of pages usable in the system**
- When the OS or hardware looks into the page table for a translation, the PTE entry must indicate if the page is on physical memory or disk (present bit: 1 or 0 respectively)
- **Page fault** → accessing a page that is not in memory
- When the **page is being read from disk**, the process state is **blocked**, and the OS can run  another program
- If **memory is full** (i.e., no frames are available), then the OS may need to first page out (i.e., **swap to disk**) one or more pages to make room for the new one
- **Waiting for the memory to be full to replace pages is a bad decision**
- A **swap daemon** (or page daemon) thread runs **in the background and frees memory** when the amount of available pages is below a given number

### Average Memory Access Time (AMAIT)
→ **TM:** cost of accessing the memory  
-> **TD:** cost of accessing the disk  
-> **PMISS:** probability of not finding the data in memory (a miss). PMISS varies from 0.0 to 1.0

$$
AMAT = TM + (P_{MISS} * TD)
$$

### Page Replacement Policies

- **Strategy:** replace the page that will be accessed furthest in the future
- **Problem:** the future is not generally known, and therefore, we cannot build this policy for a general-purpose OS
- FIFO
- Random
- LRU(Least recently used) and LFU(Least frequently used)
- **Best One:** LRU

**Clock algorithm:**
- Manages which memory pages to evict when new pages need to be loaded into RAM.
- Imagine pages arranged in a circular list (like numbers on a clock).
- A **"clock hand"** points to the next page to consider for replacement.
- Each page has a **use/reference bit** (set to 1 if recently accessed, 0 otherwise).
- If the page’s **reference bit is 0**, it means the page hasn’t been used recently — **replace this page**.
- If the reference bit is **1**, the algorithm clears it to 0 and moves the clock hand to the next page.
- 1. Repeat until a page with reference bit 0 is found.

	1. Try **evicting pages** that were **not accessed recently** or modified  
	2. Then, **choose pages that were not accessed recently but that are dirty**


- Modern systems typically run an out-of-memory killer that chooses and kills a memory-intensive process. This is a bit problematic if the process is the X server (leaving applications using the display unusable…)