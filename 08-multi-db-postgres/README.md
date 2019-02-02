
docker run \
    --name postgres \
    -e POSTGRES_USER=douglasgmsantos \
    -e POSTGRES_PASSWORD=123456 \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

    docker ps
    docker exec -it postgres /bin/bash


docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \adminer

## --- MONGODB

docker run\
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=123456 \
    -d \
    mongo:4

docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    mongoclient/mongoclient

docker exec -it mongodb /bin/bash \
    mongo --host localhost -u admin -p 123456 --authenticationDatabase admin \
    db.getSiblingDB('heroes').createUser({user: 'douglasgmsantos', pwd:'123456', roles:[{role: 'readWrite',db:'heroes'}]})
    