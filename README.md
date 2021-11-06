### UpTime Monitoring API - Raw NodeJS

[All credit goes to ❤️ "Learn with sumit"][232]

[232]: https://www.youtube.com/playlist?list=PLHiZ4m8vCp9PHnOIT7gd30PCBoYCpGoQM "Learn with sumit"

>### *#User- CRUD*
1.
* **URL:**
`/user`

* **Method :**
`POST` 

* **Body:**
  `{
      "firstName": "sohag",
      "lastName": "mahin",
      "phone": "01712300000",
      "password": "123456",
      "tosAgreement": true.
  }`

* **Header:**
`Content-Type: application/json`

2.
* **URL**
`/user?phone=[phoneNumber]`

* **Method :**
`GET` 

* **URL Params:**
`phoneNumber =[string]`

* **Header:**
	- `Content-Type: application/json`  
	- `token: 6aiegr0lunh9y8whs6mt`

3.
* **URL:**
`/user`

* **Method :**
`PUT` 

* **Body:**
`{
    "phone": "01712300000",
	"firstName": "Jahan",
}`

* **Header:**
	- `Content-Type: application/json`  

4.
* **URL:**
`/user?phone=[phoneNumber]`

* **Method :**
`DELETE` 

* **URL Params:**
`phoneNumber =[string]`

* **Header:**
	- `Content-Type: application/json`  
	- `token: 6aiegr0lunh9y8whs6mt` 


>### *#Token- CRUD*
1.
* **URL**
`/token`

* **Method :**
`POST` 

* **Body:**
`{
 "phone": "01767566678",
 "password":"123456"
}`

* **Header:**
	- `Content-Type: application/json`  

2.
* **URL:**
`token?id=[id]`

* **Method :**
`GET` 

* **URL Params:**
`id =[string]`

* **Header:**
	- `Content-Type: application/json`  

3. 
* **URL:**
`/token`

* **Method :**
`PUT` 

* **Body:**
`{
"id": "3naxnx26lz0c1o1yzcy4",
 "extend": true
}`

* **Header:**
	- `Content-Type: application/json`  

4.
* **URL:**
`token?id=[id]`

* **Method :**
`DELETE` 

* **URL Params:**
`id =[string]`

* **Header:**
	- `Content-Type: application/json`  

>### *#Checks- CRUD*
1.
* **URL:**
`/check`

* **Method :**
`POST` 

* **Body:**
`{
 "protocol": "https",
 "url": "google.com",
 "method": "GET",
 "successCodes": [200,201,301],
 "timeoutSeconds": 5
}`

* **Header:**
	- `Content-Type: application/json`  

2.
* **URL:**
`/check?id=[id]`

* **Method :**
`GET` 

* **URL Params:**
`id =[string]`

* **Header:**
	- `Content-Type: application/json`  
	- `token: 6aiegr0lunh9y8whs6mt` 

3.
* **URL:**
`/user`

* **Method :**
`PUT` 

* **Body:**
`{
    "id": "x5iok4k2g0uz7px8f4fz",
	 "successCodes": [200,201,301]
}`

* **Header:**
	- `Content-Type: application/json`  
	- `token: 6aiegr0lunh9y8whs6mt`

4.
* **URL:**
`/check?id=[id]`

* **Method :**
`DELETE` 

* **URL Params:**
`id =[string]`

* **Header:**
	- `Content-Type: application/json`  
	- `token: 6aiegr0lunh9y8whs6mt`

# END 🔚
