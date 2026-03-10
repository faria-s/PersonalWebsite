
Endereço MAC -> 48 bits (6bytes)
				-> exclusivo da nossa placa de rede
				

| ==AA== | ==BB== | ==CC== | DD  | EE  | 44  |
| ------ | ------ | ------ | --- | --- | --- |


| IP       | Payload      |
| -------- | ------------ |
| 20 bytes | 0-1480 bytes |


| Preambulo | ==DST== | ==SRC== | ==Type== | IP       | Payload      | CRC     |
| --------- | ------- | ------- | -------- | -------- | ------------ | ------- |
|           |         |         |          | 20 bytes | 0-1480 bytes | 4 bytes |

Endereçamento MAC muda a cada salto (cabeçalho do ethernet está sempre a mudar parte a ==x==)
Ethernet = 802.3


ArP request 
SRC: MAC 1
DST: FF - FF -FF - FF - FF - FF

ARP request R1 -> 1
SRC: MAC R1
DST: MAC 1



Tabela ARP 1

| IP   | MAC    |
| ---- | ------ |
| R1 1 | MAC R1 |

Tabela ARP R1

| IP   | MAC    |
| ---- | ------ |
| IP 1 | MAC R1 |
