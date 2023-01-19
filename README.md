# Store Manager 🛍️

## Project Context 💡
This project is my first RESTful API made using the MSC (Model-Service-Controller) architecture. The API is a sales management system based on dropshipping where you can create, visualize, delete and update products and sales.

### Acquired Knowledge 📖

In this project, I was able to:
- Learn and implement the MSC architecture;
- Divide my code into layers following the MSC architecture;
- Create unit tests for the model, service, and controller layers;
- Create a RESTful API;
- Connect the API to a MySQL database and use it;

## Main Technologies used 🧰
<table>
    <thead>
        <tr>
            <th>JavaScript</th>
            <th>Express</th>
            <th>Node.JS</th>
            <th>MySQL</th>
            <th>Chai JS</th>
            <th>Sinon JS</th>
            <th>Docker</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td align="center">
                <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> 
                    <img 
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" 
                        alt="javascript" 
                        width="40" 
                        height="40"
                    /> 
                </a>
            </td>
            <td align="center">
                <a href="https://expressjs.com/" target="_blank">
                    <img
                        src="https://www.orafox.com/wp-content/uploads/2019/01/expressjs.png"
                        alt="express"
                        width="40"
                        height="40"
                    />
                </a>
            </td>
            <td align="center">
                <a href="https://nodejs.org" target="_blank" rel="noreferrer"> 
                    <img 
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" 
                        alt="nodejs" 
                        width="40" 
                        height="40"
                    /> 
                </a>
            </td>
             <td align="center">
                 <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> 
                     <img 
                         src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" 
                         alt="mysql" 
                         width="40" 
                         height="40"
                    /> 
                </a>
            </td>
             <td align="center">
                <a href="https://www.chaijs.com/" target="_blank" rel="noreferrer"> 
                    <img src="https://raw.githubusercontent.com/gist/keithamus/3d8cfbaeddf8bdf5f7cd94a3bdae0934/raw/63ca295f3aa7e1b94b598d84dfe0330383497a8c/Chai%20Logo%20(C).svg" 
                        alt="chai-js" 
                        width="40" 
                        height="40"
                    /> 
                </a>
            </td>
             <td align="center">
                <a href="https://sinonjs.org/" target="_blank" rel="noreferrer"> 
                    <img 
                        src="https://sinonjs.org/assets/images/logo.png" 
                        alt="sinon-js" 
                        width="40" 
                        height="40"
                    /> 
                </a>
            </td>
            <td align="center">
                <a href="https://www.docker.com/" target="_blank" rel="noreferrer"> 
                    <img 
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" 
                        alt="docker" 
                        width="40" 
                        height="40"
                    /> 
                </a>
            </td>
        </tr>
    </tbody>
</table>

## Running the application ⚙️

1. Clone and enter this repository
```
git clone git@github.com:ImVictorM/Store-Manager.git && cd Store-Manager
```
2. Get the containers running
```
docker-compose up -d
```
3. Enter the server container
```
docker exec -it store_manager bash
```
4. Install the dependencies
```
npm install
```
5. create and populate the database
```
npm run migration && npm run seed
```
6. Start the server
```
npm run start
---- or ----
npm run debug
```

## Testing 🛠️
Running all tests:
```
npm run test:mocha
```
