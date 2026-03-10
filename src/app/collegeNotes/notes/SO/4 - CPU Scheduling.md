
- The PCBs of _Ready Processes_ are kept in a **Ready Queue**
- The **OS scheduler** is responsible for choosing the next process to execute
- The **Workload** is the set of running processes
- A **process** can also be called **job**

#### Turnaround Time

- Time the process takes to complete after arriving in the system
-  Is a **performance** metric
- The smaller the average turnaround time the better

$$
T_{turnArount}= T_{completion} - T_{arrival}
$$
- There are other non-performance metrics used by the scheduler (CPU utilization - OS keeps the CPU running useful instructions, Fairness - all processes get a chance to execute)

### FCFS (or FIFO) - First Come First Server

- **Selection criteria**: Schedule the process that arrived first (earlier)
![[2025-05-25_16:55:07.png]]
![[2025-05-25_16:55:19.png]]

- **Convoy effect:** short consumers get queued behind a heavyweight one

### SJF (Shortest Job First)

- **Selection criteria:** Run the process with the shortest runtime, then the next shortest, …

![[2025-05-25_17:01:23.png]]

![[2025-05-25_17:01:14.png]]

- SJF is a **non-preemptive scheduler** - processes run until they yield the CPU
- So the **Scheduler must preempt P1** and run another process, combining **timer interrupt** with **context switching** mechanisms

### STCF (or SRT) - Shortest Time-to-Completion/Shortest Remaining Time

- **Selection criteria**: Anytime a new process enters the system, schedule the process with the least (shortest) runtime left

![[2025-05-25_17:07:21.png]]

#### Response Time

- With **time-shared** computers, users started asking for interactive performance (time from when the process arrives in the system to the first the it is scheduled)

$$
T_{response}= T_{firstRun} - T_{arrival}
$$

![[2025-05-25_17:12:07.png]]

### RR - Round Robin/Time-Slicing

**Selection criteria**: Run a process for a given time slice (**scheduling quantum**), then switch to the next process in queue (queue processes are served in a FCFS fashion)

![[2025-05-25_17:16:06.png]]

![[2025-05-25_17:21:51.png]]

- The **scheduling quantum** is critical for RR’s efficiency  
	-> **Short values** - better response time  
	-> **Large values** - similar to a FCFS policy

- However **small scheduling quantum** can have a time of **context switching** that can **dominate the overall performance**, so the duration os the scheduling quantum must **amortize** the cost of context switching
	Ex:
		-> scheduling quantum = 10 ms and context-switching = 1ms - 10% wasted time
		->scheduling quantum = 100 ms and context-switching = 1 ms - 1% wasted time

![[2025-05-25_17:23:15.png]]

## Summary 

- **FCFS (FIFO)** 
	->Simple and easy to implement!  
	->Turnaround time is very sensitive to the processes order of arrival  
- **SJF and STCF**  
	-> Both improve turnaround time. STCF is better when processes arrive at distinct times  
	-> Both require knowing runtime in advance, and are bad when considering response time  
- **RR**  
	-> A fair scheduler, good for improving response time (important for interactive systems)  
	-> One of the worst algorithms for turnaround time (fair algorithms are bad for this metric)  

- **Tradeoff** between optimizing **turnaround time** and **response time**

## Accounting for I/O

![[2025-05-25_17:35:41.png]]

![[2025-05-25_17:35:50.png]]

### MLFQ (Multi-Level Feedback Queue)

- The runtime of processes is not know
- Combines good turnaroud time like SJF and STCF and good response time like RR.
- Multiple queues, ordered according to their **priority**
- If two processes **priorities are the same**, then they run in RR

**Assigning Priorities:**
→ Compensate processes that relinquish CPU frequently
→ Demote processes that are CPU intensive

**Allotment:** the amount of time a process can spend at a given priority level

- The time slice for each queue(priority level) may change - longer time slices have low priority queues

#### Priority Rules:

→ **Rule 1:** If Priority(P1) > Priority(P2), P1 runs (P2 does not)  
-> **Rule 2:** If Priority(P1) = Priority(P3), P1 & P3 run in RR
→ **Rule 3:** When a process enters the system it has the highest priority (top queue)  
→ **Rule 4:** Once a process uses up its time allotment at a given level, its priority is reduced (i.e., moves down one queue))
→ **Rule 5:** After a time period S, move all the jobs to the topmost queue

- When new processes with higher priority arrive, low priority processes executing are preempted

![[2025-05-25_18:10:21.png]]

→ **Rule 4 (UPDATED)**: Once a process uses up its time allotment at a given  level (regardless of how many times it has given up the CPU), its priority is reduced (i.e., moves down one queue

## Summary

- Short duration processes run with high priority (approximates STCF)  
	-> Good for turnaround time  
- High priority processes are frequently switched (approximates RR)  
	-> Good for response time  
- Challenge: several tuning knobs in MLFQ  
	-> How many queues?  
	-> How long should the allotment time per queue be?  
	-> When should the priority boost be called?  
- No easy answer  
	-> One must know the OS and workloads running there


## CFS

- **Virtual runtime (vruntime):** counts the CPU time used by a given process and is incremented every time a process uses the CPU
- **Selection criteria:** choose the process with the lowest vruntime
- Vruntimes are **indexed in a red-black tree** (balanced tree) to efficinetly choose the next to run
