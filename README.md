# delivery-service-netology



##### Запустить проект локально (должна быть запущена MongoDB на 27017)
---
`git clone`


`cd <path_to_project>`


`npm install`


`npm run start:dev`

##### Запустить проект в docker-compose (запустит MongoDB в кнтейнере на 27017)

`docker-compose up -d --build`

### API

##### Получить все объявления
---
`GET http://localhost:3000/api/advertisements`

##### Зарегистрироваться (в Postmen)
---
```javascript
{
    "email": "myemail3@netology.ru",
    "password": "12345",
    "name": "Alex",
    "contactPhone": "+71234567890"
}
```
`POST http://localhost:3000/api/signup`

##### Войти (в Postmen)
---
```javascript
{
    "email": "myemail@netology.ru",
    "password": "12345"
}
```
`POST http://localhost:3000/api/signin`

##### Получить объявление по id (в Postmen)
---
`GET http://localhost:3000/api/advertisements/:advertisementId`

##### Создать объявление (в Postmen, данные отправлять через form-data)
---
```javascript
{
    "shortText": type text,
    "description": type text,
    "images": type files,
    "tags": type text (example: "str1, str2, ..., strN")
}
```
`POST http://localhost:3000/api/advertisements`

##### Удалить объявление по id (в Postmen)
---
`DELETE http://localhost:3000/api/advertisements/:advertisementId`
