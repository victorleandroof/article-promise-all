
# Aritcle About Promise All

## Pre req
* ruby 3.2.2
* bundle 2.4.14
* node 18.16.0
* k6 
* docker  and docker-compose

## Install Deps


```bash
  npm i
  bundle install
```

## Run API


```bash
  tshield
  npm run start:dev
```

## Run on docker


```bash
  docker-compose build && docker-compose up
```
    
## Run k6 test

```bash
  k6 run test.js
```