echo "pulling mongo..."
sudo docker pull mongo
echo ""
echo "pulling mongo express"
sudo docker pull mongo-express
echo ""
echo "show networks"
sudo docker network ls
echo ""
echo "Creating ntwwork..."
sudo docker network create mongo-network
echo ""

echo "run mongo"
sudo docker run -d \
-p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=password \
--name mongodb \
--net mongo-network \
mongo
echo ""

echo "run mongo-express"
sudo docker run -d \
-p 8081:8081 \
-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
-e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
--net mongo-network \
--name mongo-express \
-e ME_CONFIG_MONGODB_SERVER=mongodb \
mongo-express
