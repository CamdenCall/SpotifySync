Spotify Sync

Docker Commands:

docker build -t spotify-sync .

docker run -p 3000:3000 spotify-sync

How to deploy a stack:
docker stack deploy -c docker-compose.yaml spotify-stack

How to scale first stack to 7 instances:
docker service scale spotify-stack_spotify-service-1=7

How to remove stack: 
docker stack rm spotify-stack

How to remove container:
docker stop <container-id>
docker rm <container-id>

