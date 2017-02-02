# Tyny
A node.js url shortener API.
- [Install](#install)
- [API Endpoints](#api-endpoints)
- [Post Requests](#post-requests)
- [Get Requests](#get-requests)
- [Contributing](#contributing)

## Install

To install this app download or clone the repository and install the required
packages for the project.

```
$ npm install express --save
$ npm install body-parser --save
$ npm install sequelizer --save
$ npm install mysql --save
$ npm install dotenv --save-dev
```
Or install required packages at once using

```
$ npm install

```

Next create your local database and add a .env file with the following fields:
```
DB_NAME = YOUR DATABASE NAME
DB_USER = YOUR USER NAME
DB_PASS = YOUR PASSWORD
DB_HOST = YOUR HOST
DB_SCHEMA = mysql
DB_PORT = MYSQL PORT
```
## API Endpoints
The following endpoints are available through the API:
* POST -  /api/v1/urls - creates a shortened URL
* GET - /api/v1/urls - retrieves the last created short URL

## POST Requests
To shorten a URL make a POST request to /api/v1/urls and send a JSON request with the URL
you want to shorten. Example:
```
{
	"url":"https://github.com/DPCobb/URL-Shortener"
}
```
This will then take your URL and parse it into a shortened URL. The API will then
return a JSON response with your new URL. Example:
```
{
  "shortUrl": "tyny.io/8d10273"
}
```

## GET Requests
Sending a GET request to /api/v1/urls will return the following JSON response:
```
{
  "url": "https://github.com/DPCobb/URL-Shortener",
  "id": 3,
  "tynyUrl": "tyny.io/8d10273",
  "createdAt": "2017-02-02T21:13:15.000Z",
  "updatedAt": "2017-02-02T21:13:15.000Z"
}
```
This GET request will respond with the information for the last created short URL.

## Contributing
To contribute to this project please [create a new pull request](https://help.github.com/articles/creating-a-pull-request/). Additionally,
the following requirements should be met:
* A good description of the pull request, what it is and why it is needed.
* If creating a new feature please update the readme.md file with documentation
including endpoints and examples.
* Lastly, try to keep the coding style similar to the existing API.
