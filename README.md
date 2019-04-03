# bus-explorer
block explorer for bitconch chain


```bash

npm install --save -g solgraph --unsafe-perm=true --allow-root


```

install nodejs and redis
```bash


```

Install Redis & Administration

Refer to https://redis.io/topics/admin

```bash
vim /etc/sysctl.conf

```
 Add ```vm.overcommit_memory =1``` to sysctl.conf

```
sysctl vm.overcommit_memory=1
```

* Redis Log 

Usually log file is defined in /etc/redis/redis.conf

default value ```logfile /var/log/redis/redis-server.log```

## install && start explorer
1. go to go/src/github.com/bitconch/
```bash
cd go/src/github.com/bitconch/
```
2. clone explorer
```bash
git clone https://github.com/bitconch/bus-explorer
```

3. build
go to the project root folder
```bash
cd bus-explorer
yarn
```

4. Start 
```bash
yarn start:api
```
open another terminal
```bash
yarn start:ui
```

run the bus instance, refer to bitcon/bus
