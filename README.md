# My First API REST 😊
This API returns some games from DB. You can edit, delete, list and save new games with this API.
## Endpoints
| Endpoint |Description | Params |  Responses |
|----------|----------|-------|-----------|
| /games   | It is responsible to return all registered games in my database  | No Params | [200] - [401]

#### 200 - When it returns 200, it will return all games from my API.
Example Response:
```
  [
	{
		"name": "GTA V",
		"id": 1,
		"year": 2013,
		"price": 100
	},
	{
		"name": "Shadow of the colossus",
		"id": 2,
		"year": 2009,
		"price": 50
	},
	{
		"name": "Dying Light",
		"id": 3,
		"year": 2016,
		"price": 40
	}
]
```

#### 401 - When it returns 401, it means that you arent authenticate or something wrong ocurred during the athentication.
Example Response:
```
{
	"err": "Invalid Token"
}
```
--------
| Endpoint |Description | Params |  Responses |
|----------|----------|-------|-----------|
| /auth   | It is responsible to do login process  | email, password | [200] - [401]

#### 200 - When it returns 200, it will return token.
Example Response:
```
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJnYWJpc21lcmlnb0BnbWFpbC5jb20iLCJpYXQiOjE2NDYwOTIzNDksImV4cCI6MTY0NjI2NTE0OX0.i5Jdjdy2PDdhzvo3FTtVbBVGTNaGj3KiqTzhy1dtMcs"
}
```
#### 401 - When it returns 401, it means that your password or email is incorrects.
Example Response:
```
{
	"err": "Invalid credentials!"
}
```
