# 2.1 Time

- A **thread is a state machine**, and its **state transitions are called events**.
- Events are instantaneous and never simultaneous: distinct events occur at distinct times
- The precedence relation “→” is a total order on events


→ Let a0 and a1 be events such that a0 → a1
→ An interval **I**a = (a0, a1) is the duration between a0 and a1
→ **I**a percedes **I**b = (b0,b1), so **I**a → **I**b, if a1 → b0 (that is, if the ﬁnal event of IA precedes the starting event of IB )

- **Intervals that are unrelated by → are said to be concurrent**.

# 2.2 Critical Sections

**critical section** - a block of code that can be executed by only one thread at a time.

- The standard way to approach mutual exclusion is through a Lock object

```java

public interface Lock {  
	public void lock(); // before entering critical section  
	public void unlock(); // before leaving critical section  
}  
Figure 2.2 The Lock interface.  


public class Counter {  
	private long value;  
	private Lock lock; // to protect critical section  
  
	public long getAndIncrement() {  
		lock.lock(); // enter critical section  
		try {  
			long temp = value; // in critical section  
			value = temp + 1; // in critical section  
			return temp;  
		} finally {  
		lock.unlock(); // leave critical section  
		}  
	}  
}
Figure 2.3 Using a lock object
```

1. each critical section is associated with a unique Lock object,  
2. the thread calls that object’s lock() method when it is trying to enter the critical section, and  
3. the thread calls the unlock() method when it leaves the critical section.

```java
Pragma 2.2.1. In Java, these methods should be used in the following struc-  
tured way.  

1 mutex.lock();  
2 try {  
3 ... // body  
4 } finally {  
5 mutex.unlock();  
6 }  

This idiom ensures that the lock is acquired before entering the try block,  
and that the lock is released when control leaves the block, even if some statement in the block throws an unexpected exception.
```

Let us assume, for simplicity, that each thread repeatedly acquires and  
releases the lock, with other work taking place in the meantime.  

**Mutual Exclusion** - Critical sections of different threads do not overlap. For threads A and B, and integers j and k, either CSkA → CSjB or CSjB → CSkA .

**Freedom from Deadlock** - If some thread attempts to acquire the lock, then some thread will succeed in acquiring the lock. If thread A calls lock() but never acquires the lock, then other threads must be completing an inﬁnite number of critical sections.  

**Freedom from Starvation** - Every thread that attempts to acquire the lock eventually succeeds. Every call to lock() eventually returns. This property is some times called lockout freedom.

- The deadlock-freedom property is important. It implies that the system never “freezes.” Individual threads may be stuck forever (called starvation), but some thread makes progress.

  
A program can still **deadlock even if each of the locks it uses satisﬁes the deadlock-freedom property**:
	-> Consider threads A and B that share locks l0 and l1
	-> First, A acquires l0 and B acquires l1
	-> Next, A tries to acquire l1 and B tries to acquire l0
	-> The threads deadlock because **each one waits for the other to release its lock**

# 2.3 2-Thread Solutions

### 2.3.1 The LockOne Class

The LockOne algorithm uses Boolean Flags.
- When a thread A is locked, it sets its flag to true. 
- When it unlocks it sets the flag to false. 
- Thread B only locks if flag[A] = false, if not it B waits.

Problem: does not prevent deadlocks from occuring.
- If writeA(flag[A] = true) and writeB (flag[B] = true) events occur before readA(flag[B]) and readB (flag[A]) events, then both threads wait forever.2

Nevertheless, LockOne has an interesting property: if one thread runs before the other, no deadlock occurs, and all is well.

```java
class LockOne implements Lock {  
	private boolean[] flag = new boolean[2];  
	// thread-local index, 0 or 1  
	public void lock() {  
		int i = ThreadID.get();  
		int j = 1 - i;  
		flag[i] = true;  
		while (flag[j]) {} // wait  
	}  
	public void unlock() {  
		int i = ThreadID.get();  
		flag[i] = false;  
	}  
}
```

### 2.3.2 The LockTwo Class

$write_{A}(victim = A) → write_{B} (victim = B) → read_{A}(victim == B).$

```java
class LockTwo implements Lock {  
	private int victim;  
	public void lock() {  
		int i = ThreadID.get();  
		victim = i; // let the other go first  
	while (victim == i) {} // wait  
	}  
	public void unlock() {}  
}
```

- The LockTwo class is inadequate because it deadlocks if one thread runs completely ahead of the other.
- The LockOne and LockTwo classes complement one another: each succeeds under conditions that cause the other to deadlock.

### 2.3.3 The Peterson Lock

- Combines the LockOne and LockTwo algorithms to construct a deadlock-free and starvation-free Lock algorithm
- Only works with 2 thread

1º → raises flag to show that wants to enter critical section (flag[i] = true)
2º → gives priority to the other thread by making itself the victim (victim = i)
3º → waits until the other threads lowers it's flag and becomes the victim

```java
class Peterson implements Lock {  

	// thread-local index, 0 or 1  
	private boolean[] flag = new boolean[2];  
	private int victim;  
	public void lock() {  
		int i = ThreadID.get();  
		int j = 1 - i;  
		flag[i] = true; // I’m interested  
		victim = i; // you go first  
		while (flag[j] && victim == i) {}; // wait  
	}  
	
	public void unlock() {  
		int i = ThreadID.get();  
		flag[i] = false; // I’m not interested  
	}  
}
```


# 2.4 The Filter Lock

- Works like Peterson's Algorithm at any level (Peterson is only for 2 threads)
- Creates n − 1 “waiting rooms,” called levels, that a thread must traverse before acquiring the lock
-  Levels satisfy two important properties:  
	-> At least one thread trying to enter level L succeeds.  
	-> If more than one thread is trying to enter level L , then at least one is blocked (i.e., continues to wait at that level).

```java
class Filter implements Lock {  
	int[] level;  
	int[] victim;  
	public Filter(int n) {  
		level = new int[n];  
		victim = new int[n]; // use 1..n-1  
		for (int i = 0; i < n; i++) {  
			level[i] = 0;  
		}  
	}
  
	public void lock() {  
		int me = ThreadID.get();  
		for (int i = 1; i < n; i++) { // attempt level i  
			level[me] = i;  
			victim[i] = me;  
		// spin while conflicts exist  
			while ((∃k != me) (level[k] >= i && victim[i] == me)) {};  
		}  
	}
  
	public void unlock() {  
		int me = ThreadID.get();  
		level[me] = 0;  
	}  
}
```

https://hpincket.com/explain-the-filter-lock.html

- Each thread must pass through n − 1 levels of “exclusion” to enter its critical section.
- Each level L has a distinct victim[L] ﬁeld used to “ﬁlter out” one thread, excluding it from the next level.
- The Filter lock algorithm is deadlock-free

# 2.5 Fairness

- **Starvation-freedom** property guarantees that **every thread that calls lock() eventually enters the critical section**, but it makes no guarantees about **how long** this may take
- Split the lock() method into two sections of code (with corresponding execution intervals):  
	-> A **doorway section**, whose execution interval $D_{A}$ consists of a bounded number of steps
	-> a **waiting section**, whose execution interval $W_{A}$ may take an unbounded number of steps.

**Fairness:** A lock is ﬁrst-come-ﬁrst-served if, whenever, thread A ﬁnishes its doorway before thread B starts its doorway, then A cannot be overtaken by B:
$$D^{j}_{A} -> D^{k}_{B} \; then \; CS^{j}_{A} -> CS^{k}_{B}$$

# 2.6 Lamport’s Bakery Algorithm

- ﬁrst-come-ﬁrst-served property
- Each thread takes a number in the doorway, and then waits until no thread with an earlier number is trying to enter it.

```java
class Bakery implements Lock {  
	boolean[] flag;  
	Label[] label; 
	 
	public Bakery (int n) {  
		flag = new boolean[n];  
		label = new Label[n];  
		for (int i = 0; i < n; i++) {  
			flag[i] = false; label[i] = 0;  
		}  
	}  
	
	public void lock() {  
		int i = ThreadID.get();  
		flag[i] = true;  
		label[i] = max(label[0], ...,label[n-1]) + 1;  
		while ((∃k != i)(flag[k] && (label[k],k) << (label[i],i))) {};  
	}  
	
	public void unlock() {  
		flag[ThreadID.get()] = false;  
	}  
}
```

- flag[A] is a Boolean ﬂag indicating whether A wants to enter the critical section, and label[A] is an integer that indicates the thread’s relative order when entering the bakery, for each thread A.
  
  
  
## Summary

- to enter critical section
	-  1º raise flag
	- 2º look at the other flag
	
- PROBLEM: if the two raise flag at the same time a deadlock happens
- SOLUTION: Peterson's Algorithm (one side gives priority to the other)
	- is deadlock free and starvation free because once a thread unlocks the other that was waiting enters right after

