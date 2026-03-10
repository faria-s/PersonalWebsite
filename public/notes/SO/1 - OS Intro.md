 - The OS manages the interaction between users/programs and hardware
 - The OS main clients are programs, that executes billions of instructions

When a **program runs**:
- The CPU **fetches** instructions from memory
- **Decodes** and **Executes** the instructions
This is repeated until the program ends

- The **main goal of the OS** is to make **easy and efficient to run programs** by allowing multiple programs to run simultaneously while managing it's IO and memory requests. 

### Modern OS

- **Abstracts** the "low-level" details os hardware through virtualization
- Provides an **Interface (System Call API)** for users to tell the OS what to do
- On top of the OS we can build system programs (GUI, shell, manipulate files/directories, compile/load/execute/debug programs)

- Ensures **performance when running multiple programs** accessing shared physical resources 
- Ensures **protection by isolating running programs** from each other and from the OS
- **Reliability:** A failure of the OS makes all applications fail
- **Security:** protection against malicious programs

- Even though there are a limited number os CPU's, users get the idea that several programs are running simultaneously

**Mechanisms**: how does the OS switch running programs?
**Policy:** which program should be scheduled next?

**Memory management**: Physical memory can be seen as a simple array of bytes. Programs (running) need to store their instructions and data structures in memory

**Persistence**: Memory is volatile, meaning that data is lost upon a reboot (or crash) of the computer. Disk devices (e.g., HDDs, SSDs) allow programs to store their data persistently

**Running programs** → execute instructions (Fetch, Decode, Execute)
**Virtualization** → OS takes physical resources(Memory, CPU, Disk) and transforms it into a general form of itself, sharing resources between programs.
- The OS is a resource manager, that manages how many programs access the hardware
- **Virtualization of the CPU** → Turning a single CPU into the impression that exist an infinity amount of CPU's, allowing many programs to seemingly run at once
- **Concurrency** →  problems that arise, and must be addressed, when working on many things at once (multi-programming, multi-thread)

OS:
	-> virtualizes physical resources
	-> handles through tricky issues related to concurrency
	-> stores files resistente, making them safe over the long-term