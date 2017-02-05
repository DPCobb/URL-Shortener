# Tyny
A node.js url shortener API.
- [Install](#install)
- [Create A User](#create-user)
- [API Endpoints](#api-endpoints)
- [Routes](#routes)
- [Post Requests](#post-requests)
- [Get Requests](#get-requests)
- [Delete Requests](#delete-requests)
- [Go To Links](#accessing-links)
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

## Create User
Although, this step is entirely optional it will allow users to search based on a user key.
To create a user send a POST request to /api/v1/create with the following data:
```
{
  "email": "example@example.com",
  "pass": "Your password",
}
```
You will then receive a response in JSON with your user key.
```
{
  "email": "example@example.com",
  "pass": "password",
  "key": "4b61109c5c"
}
```
To track your shortened links by user you should copy and keep your key! This field will
need to be added to the JSON for link creation to track by user.
## API Endpoints
The following endpoints are available through the API:
* POST -  /api/v1/create - creates a user
* POST -  /api/v1/urls - creates a shortened URL
* POST -  /api/v1/urls/{ID} - updates a link by given ID
* GET - /api/v1/urls - retrieves all URL's
* GET - /api/v1/urls/{ID} - retrieves short URL based on given ID
* GET - /api/v1/urls/user/{KEY} - retrieves all URL's generated by a specific user key
* DELETE - /api/v1/urls/{ID} - deletes a URL based on given ID

## Routes

The following routes are provided to redirect to the specific link
* /go/{ID} - Passing just the link ID will redirect to the created link
```
localhost:3000/go/{ID}
```
* /go/{TYNY URL} - Passing the entire Tyny URL will redirect to the created link
```
localhost:3000/go/{tynyUrl}
```
* /{SHORT URL} - Passing just the short URL will redirect to the created link
```
localhost:3000/{shortUrl}
```

## POST Requests
### /api/v1/create
Although, this step is entirely optional it will allow users to search based on a user key.
To create a user send a POST request to /api/v1/create with the following data:
```
{
  "email": "example@example.com",
  "pass": "Your password",
}
```
You will then receive a response in JSON with your user key.
```
{
  "email": "example@example.com",
  "pass": "password",
  "key": "4b61109c5c"
}
```
### /api/v1/urls
To shorten a URL make a POST request to /api/v1/urls and send a JSON request with the URL
you want to shorten, and optionally your key. Example:
```
{
	"url":"https://github.com/DPCobb/URL-Shortener",
	"key" : "YOUR KEY"
}
```
This will then take your URL and parse it into a shortened URL. The API will then
return a JSON response with your new URL. Example:
```
{
  "url": "https://github.com/DPCobb/URL-Shortener",
  "tynyUrl": "tyny.io/8d10273",
  "shortUrl": "8d10273",
  "key": "43a995d29e"
}
```
### /api/v1/urls/{ID}
To update a URL make a POST request to /api/v1/urls/{ID} where {ID} is the post ID. The JSON
request should contain only the data you wish to update. The following example will update the URL of the
given post.
```
{
  "url": "http://www.google.com"
}
```
The API will then send the following response:
```
{
  "url": "http://www.google.com",
  "id": 1,
  "tynyUrl": "tyny.io/7fdcdf0",
  "shortUrl": "7fdcdf0",
  "key": "43a995d29e",
  "createdAt": "2017-02-05T19:49:59.000Z",
  "updatedAt": "2017-02-05T20:11:27.000Z"
}
```

## GET Requests

### /api/v1/urls
Sending a GET request to /api/v1/urls will return all of the created URL's:
```
[
  {
    "url": "http://www.google.com",
    "id": 1,
    "tynyUrl": "tyny.io/7fdcdf0",
    "shortUrl": "7fdcdf0",
    "key": "43a995d29e",
    "createdAt": "2017-02-05T19:49:59.000Z",
    "updatedAt": "2017-02-05T20:11:27.000Z"
  },
  {
    "url": "https://github.com/DPCobb/URL-Shortener",
    "id": 4,
    "tynyUrl": "tyny.io/8d10273",
    "shortUrl": "8d10273",
    "key": "43a995d29e",
    "createdAt": "2017-02-05T20:16:49.000Z",
    "updatedAt": "2017-02-05T20:16:49.000Z"
  }
]
```
### /api/v1/urls/{ID}
This GET request will return the information for a single URL based on the ID given, passing ID 1 will return a response of:
```
{
  "url": "http://www.google.com",
  "id": 1,
  "tynyUrl": "tyny.io/7fdcdf0",
  "shortUrl": "7fdcdf0",
  "key": "43a995d29e",
  "createdAt": "2017-02-05T19:49:59.000Z",
  "updatedAt": "2017-02-05T20:11:27.000Z"
}
```
### /api/v1/urls/users/{KEY}
This GET request will return all the generated URL's a given user key, in our example adding the key "43a995d29e" would return the following data:
```
[
  {
    "url": "http://www.google.com",
    "id": 1,
    "tynyUrl": "tyny.io/7fdcdf0",
    "shortUrl": "7fdcdf0",
    "key": "43a995d29e",
    "createdAt": "2017-02-05T19:49:59.000Z",
    "updatedAt": "2017-02-05T20:11:27.000Z"
  },
  {
    "url": "https://github.com/DPCobb/URL-Shortener",
    "id": 4,
    "tynyUrl": "tyny.io/8d10273",
    "shortUrl": "8d10273",
    "key": "43a995d29e",
    "createdAt": "2017-02-05T20:16:49.000Z",
    "updatedAt": "2017-02-05T20:16:49.000Z"
  }
]
```

## Delete Requests
### /api/v1/urls/{ID}

Sending a delete request to /api/v1/urls/{ID} where ID is the URL ID will delete the data for that URL and, if successful, return a 1, if the delete fails a 0 will be returned.

## Accessing links

There are three ways to redirect to a given URL. For this we will use the data from the following returned URL to build our links:
```
{
  "url": "http://www.google.com",
  "id": 1,
  "tynyUrl": "tyny.io/7fdcdf0",
  "shortUrl": "7fdcdf0",
  "key": "43a995d29e",
  "createdAt": "2017-02-05T19:49:59.000Z",
  "updatedAt": "2017-02-05T20:11:27.000Z"
}
```
* /go/{ID} - Passing just the link ID will redirect to the created link
```
localhost:3000/go/1
```
* /go/{TYNY URL} - Passing the entire Tyny URL will redirect to the created link
```
localhost:3000/go/tyny.io/7fdcdf0
```
* /{SHORT URL} - Passing just the short URL will redirect to the created link
```
localhost:3000/7fdcdf0
```

## Contributing
To contribute to this project please [create a new pull request](https://help.github.com/articles/creating-a-pull-request/). Additionally,
the following requirements should be met:
* A good description of the pull request, what it is and why it is needed.
* If creating a new feature please update the readme.md file with documentation
including endpoints and examples.
* Lastly, try to keep the coding style similar to the existing API.
