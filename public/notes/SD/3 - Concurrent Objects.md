# 3.8 - The Java Memory Model

 - in a multithreaded computation, one thread can spy on another and observe out-of-order executions.
 - **Fundamental Property of relaxed memory models:** if a program’s sequentially consistent executions follow certain rules, then every execution of that program in the relaxed model will still be sequentially consistent.
 - In the Java memory model, objects reside in a shared memory and each thread has a private working memory that contains cached copies of ﬁelds it has read or written.
 - a thread that writes to a ﬁeld **might not propagate that update to memory right away**, and a thread that reads a ﬁeld might not update its working memory if the ﬁeld’s copy in memory changes value.
 - the term “**synchronization**” implies some form of **atomicity or mutual exclusion.**
 - Some synchronization events cause a thread to write cached changes back to shared memory, making those changes visible to other threads. Other synchronization events cause the thread to invalidate its cached values, forcing it to reread ﬁeld values from memory, making other threads’ changes visible.

## 3.8.1 Locks and Synchronized Blocks

- A **thread** can achieve **mutual exclusion** either by **entering a synchronized block or method**, which acquires an **implicit lock**, or by acquiring an **explicit lock** (such as the ReentrantLock from the java.util.concurrent.locks package).
- If all accesses to a particular ﬁeld are protected by the same lock, then reads–writes to that ﬁeld are linearizable.
- only the thread that aquires the lock can modify or read what is in that block

## 3.8.2 Volatile Fields

- Writing a volatile ﬁeld is like releasing a lock: the v**olatile ﬁeld is immediately written back to memory**
- One common usage pattern for volatile variables occurs when a ﬁeld is read by multiple threads, but only written by one.

## 3.8.3 Final Fields

 - ﬁeld declared to be **final cannot be modiﬁed**
 - If a constructor is synchronized incorrectly, however, then ﬁnal ﬁelds may be observed to change value. The rule is simple: **the this reference must not be released from the constructor before the constructor returns**

