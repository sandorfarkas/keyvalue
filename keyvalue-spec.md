Keyvalue
========

# Prerequisite

CouchDB
user: admin
pass: lalala
{db}: store

CouchDB Fauxton: (http://localhost:5984/_utils/)_

# Get couchdb version

curl -X GET http://localhost:3000/version

# Register key

Create CouchDB document in "store" DB with key as id

## Request

Keyvalue: POST /{key}
curl -v -X POST http://localhost:3000/{key}

CouchDB: PUT /{db}/{docid}

curl -v -X PUT http://admin:lalala@localhost:5984/store/key -d "{}"

## Response


* from db: HTTP/1.1 201 Created
  from app: generate token, Update CouchDB document with token hash
* from db: HTTP/1.1 409 Conflict
  from app: HTTP/1.1 409 Conflict - key already exists
* from db: Other
  from app: HTTP/1.1 500 Internal Server Error - return error

## Update CouchDB document with token hash
## Request

curl -v -X PUT http://admin:lalala@localhost:5984/store/cde5f6f81c8bf9239da032c5aedacdc970d0591644cbb32ce4eed9f916029f0529380d5e452c38daded6904af20fe2d -d "{\"\_rev\": \"1-967a00dff5e02add41819138abb3284d\", \"tokenHash\": \"asdasd\"}"

## Response
* from db: HTTP/1.1 201 Created
from app: HTTP/1.1 201 Created | return http://localhost:3000/{token}/{key}
* from db: Other
from app: HTTP/1.1 500 Internal Server Error - return error







## Generate token
## Request
### Response

HTTP/1.1 409 Conflict -> generate new key
Other -> return error


# Get document

## Request

curl -v -X GET http://admin:lalala@127.0.0.1:5984/store/123456 -d

# Create document

## Request

curl -v -X PUT http://admin:lalala@127.0.0.1:5984/store/123456 -d "
\"content\" : \"{ 
\"principalId\": \"83c5f711-fb8f-4ac5-b925-b2f8082ec140\", 
\"description\": \"fd\" 
}
"

## Responses

201 Created – Document created and stored on disk
202 Accepted – Document data accepted, but not yet stored on disk
400 Bad Request – Invalid request body or parameters
401 Unauthorized – Write privileges required
404 Not Found – Specified database or document ID doesn’t exists
409 Conflict – Document with the specified ID already exists or specified revision is not latest for target document
