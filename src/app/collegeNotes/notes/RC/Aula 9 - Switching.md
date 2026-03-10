
Tabela comutação-> apenas endereço MAC, não tem endereço IP, porque switching só tem layer 2

Ping - A->B
Ping - C->B

Se não houver TTL default no enunciado, colocamos a que quisermos, desde que seja coerente (Por exemplo 20)

Floading -> parecido a broadcast, mas vai para todo o lado menos a interface de onde recebeu tráfego (Específico dos switches)

![[2025-05-05_16:31:03.png]]
S1:

| MAC   | Interface | TTL |
| ----- | --------- | --- |
| Mac A | 1         | 20  |
| Mac B | 2         | 20  |

S2:

| Mac   | Interface | TTL |
| ----- | --------- | --- |
| Mac A | 1         | 20  |
| Mac B | 2         | 20  |
| Mac C | 3         | 20  |

!! Como o C-> B acontece depois do A->B seria expectável que o TTL das duas primeiras entradas estivessem a diminuir, por exemplo a 18, mas na realidade quando entram novas entradas, dão todas refresh, logo ficam todas a 20 outra vez

Router atua sobre a ethernet, AP envia as ondas(Envia informação no router e para o router)

Ethernet != Rádio

## A -> G

![[2025-05-05_16:37:03.png]]

ToDS -> 1 (to destination)
FromDS -> 0 (from destinaton)

SRC-> MAC A
DST -> MAC R1

Transmitter -> MAC A
Receiver -> MAC AP

## G -> A

![[2025-05-05_16:39:01.png]]

ToDS -> 0
FromDS -> 1

SRC -> MAC R1 (G está fora da rede local, logo não temos o MAC)
DST -> MAC A

Transmitter -> MAC AP
Receiver -> MAC A

## A -> B

![[2025-05-05_16:48:03.png]]

(Vem de fora do Router R1, Para fora do Router R2, ou seja de fora da rede wireless, para fora da rede wireless)
ToDS -> 1
FromDS -> 1

SRC -> MAC R1
DST -> MAC R2

Transmitter -> MAC AP1
Receiver -> MAC AP2


## CSMA/CA

![[2025-05-05_17:16:09.png]]

RTS -> request to send
CTS -> Clear to send

![[2025-05-05_17:16:02.png]]
## Nó Exposto

![[2025-05-05_17:15:55.png]]