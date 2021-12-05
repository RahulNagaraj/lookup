# lookup

Home Services App

# Steps to build

1. Download and install Docker for Desktop from <https://www.docker.com/get-started> -> You need to install wsl for Windows
2. Unzip the folder
3. cd lookup
4. Run docker-compose up

---

# Steps to run

1. Once the docker has finished building/creating containers
2. Steps to run MongoAdmin:
    1. Visit <http://localhost:8081> to access the mongo admin client where you can view all the databases, collections, and documents
    2. If promted for credentials, use the below section for credentials
3. Steps to run Neo4J:
    1. Visit <http://localhost:7474/> to access the Neo4J graph database from browser.
    2. The credentials are given below to connect to the database
4. Steps to run PostgreSQL:
    1. Download and install postgres from <https://www.postgresql.org/>
    2. Ensure to install pgAdmin
    3. Open pgAdmin and connect to postgres server
    4. Create a new database server connection, by right-clicking on servers on left pane
    5. Properties to set for server:
    6. Name: "lookup"
    7. Hostname/Address: "localhost"
    8. Port: 5432
    9. Username: lookup
    10. Password: lookup
5. Steps to run Python notebook:
    1. Open docker and click on Containers/Apps from left navigation
    2. Click on lookup
    3. Click on lookup-jupyter
    4. If there is an error, restart the service by clicking on restart from top right corner
    5. Once successfully loaded, the terminal gives you a link to access the jupyter notebook. The link will be "<http://127.0.0.1:8888/?token=token>"
    6. Copy and paste the link in the browser
    7. Then you can access all the notebooks on the browser.
    8. Firstly, run the jupyter notebook named yelp_business.ipynb -> Fetches data from yelp and inserts into MongoDB
    9. Second, run twitter_matches.ipynb -> Fetches data from twitter and inserts into MongoDB
    10. Third, run py2neo.ipynb -> Reads the data from data-export and creates Nodes and Relationships in Neo4J
6. Steps to run Node server:
    1. Visit <http://localhost:8000/api> to access the GraphQL server to write your queries and mutations
    2. If, for some reason the lookup-server is not able to connect to PostgreSQL, restart the lookup-server in docker
7. Steps to run Client app:
    1. Visit <http://localhost:3000> to access the UI from your favorite browser

---

## PS: docker-compose up downloads the images and builds the images, it will take a while until all the services are up and running. If lookup-server is unable to connect to postgresql, restart the lookup-server service and it should connect automatically

---

## DB Server Credentials

### PostgreSQL

1. Database Name: lookup
2. Database User: lookup
3. Database Password: lookup
4. Port: 5432 // If you are running your postgres on computer, please quit/exit/shutdown the service

### MongoDB/Mongo Admin

1. Database Name: lookup
2. Database User: lookup
3. Database Password: lookup
4. Port: 27017

### Neo4j

1. Database Name: neo4j
2. Database User: neo4j
3. Database Password: root
4. Port: 7474

### Mongo Admin

1. Database User: lookup
2. Database Password: lookup

---

## Lines of code

**Number of lines of code on Client: 8,238**

**Number of lines of code on Server: 1,762**

**Number of lines of code in JavaScript: 10,000**

**Number of lines of code in Python: 1,174**

**Total number of lines of code: 11,174**

---

## Features/Requirements implemented

1. User Account/ Profile/ Transaction management and SQL/NoSql DB
2. Analytics and visual Reports
3. Reviews and trending is stored MongoDB
4. Auto-Complete search feature
5. Google MAPS - Near ME search feature.
6. Knowledge Graph Searches and Neo4j.
7. Recommended Events and services.
8. Twitter matches

### Additional features implemented

1. Deployment is done in Docker.
2. Filtering of Events/Services/Businesses
3. For recommended events, customers can be redirected to the official site if he/she wants to book the ticket
4. Customers can search services, businesses and recommended events on Google Maps.
5. Used latest tech stack to fulfill all the requirements.
    1. React, Redux, Redux-Saga
    2. Node.js
    3. GraphQL.
