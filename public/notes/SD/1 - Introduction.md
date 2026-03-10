
- “multicore” architectures -  multiple processors (cores) communicate directly through shared hardware caches.
- **parallelism** - more effective by harnessing **multiple processors to work on a single task**.
- modern computer systems are inherently **asynchronous:** activities can be halted or delayed without warning by interrupts, preemption, cache misses, failures, and other events.

**Computability** - ﬁguring out what can be computed in an asynchronous concur-  
rent environment
**Program Correctness** - understanding of computability is the speciﬁcation  
and veriﬁcation of what a given program actually does

**Safety Properties** - assure that nothing "bad" ever happens, like how a trafﬁc light never displays green in all directions, even if the power fails

**Liveness Properties** - states that a particular good thing will happen, for example a red trafﬁc light will eventually turn green

# 1.1 - Shared Objects and Synchronization

**Problem:** ﬁnd all primes between 1 and 10^10

**Approach 1:**
Giving each thread an equal share of the input domain.

**Fails:** Equal ranges of inputs do not necessarily produce equal amounts of work, there are more primes between 1 and 109 than between 9 · 10^9 and 10^10

**Approach 2:**
Assign each thread one integer at a time.

Important to have in attention so that each thread reads and modifies a shared counter atomically, so that threads A and B dont read and write at the same time, not giving the expected result

**Mutual Exclusion Problem** - making sure that only one thread at a time can execute a particular block of code

# 1.2 - A Fable

### 1.2.1 Properties of Mutual Exclusion

**Deadlock** - is a phenomenon that arises when two threads both hold a resource that the other needs to continue and they are both waiting on the other to release it, resulting in a situation termed circular waiting, where without external interference there is no possibility of releasing the resource.

**Deadlock-Freedom Property** - is defined as a progress condition for lock implementations, guaranteeing that some thread makes progress even in the presence of contention for shared resources. 
If a thread wants to execute a particular block of code then it eventually succeeds. If two threads want to execute the same block of code at the same time then eventually one of them succeeds.

**Waiting** - the very essence of mutual exclusion

### 1.2.2 The Moral

**Transient communication** - both parties participate at the same time (EX: shouting, gestures, or cell phone calls)

**Persistent communication** - allows the sender and receiver to participate at different times (EX: Posting letters, sending email, or leaving notes under rocks)

- Mutual Exclusion uses Persistent communication
- In modern operating systems, one common way for one thread to get the attention of another is to send it an **interrupt**.

# 1.3 The Producer–Consumer Problem

In this problem, we have:

- **Producers**: Generate data items and place them in a shared buffer.
- **Consumers**: Remove and process data items from the buffer.

The main challenge is to ensure:

1. A producer does not add data to a full buffer.
2. A consumer does not remove data from an empty buffer.
3. Multiple producers and consumers do not access the buffer simultaneously, preventing race conditions.

- The solution **requires waiting**


# 1.4 The Readers–Writers Problem

**readers–writers problem** - two threads reading and writing in the same code, can lead to problems such as a thread modifying the code before the other had time to read it.

- Can be **solved without waiting**

**Starvation** - occurs when a process is indefinitely denied access to a necessary shared resource, even when the resource is available  

# 1.5 The Harsh Realities of Parallelization

- In reality upgrading a uniprocessor to a n-way multiprocessor, does not increase the computational power n times, given that some tasks take longer to process than others.


**Amdahl’s Law** - the speedup of a job to be the ratio between the time it takes one processor to complete the job (as measured by a wall clock) versus the time it takes  
n concurrent processors to complete the same job. **Is the ratio between the sequential (single-processor) time and the parallel time**

**S** - speedup
**p** - fraction of the job that can be executed in parallel

```
S = \frac{1 }{1 − p + \frac{p}  {n}}
```

- Even if we manage to parallelize 90% of the solution, but not the remaining 10%, then we end up with a ﬁve-fold speedup, but not a ten-fold speedup. In other words, the **remaining 10% that we did not parallelize cut our utilization of the machine in half.**
- It seems worthwhile to invest an effort to derive as much parallelism from the remaining 10% as possible, even if it is difﬁcult to effectively program the parts of the code that require coordination and synchronization, because **the gains made on these parts may have a profound impact on performance**.

- It is **important to minimize** the granularity of sequential code; in this case, the **code accessed using mutual exclusion**, using it in an effective way
