# populate database
## dependencies
`python3 -m pip install requests`

## use
To remove all the products records and their assets:
`python3 clear_database.py <YOUR-PRIVATE-KEY>`

To add all the products (in products.json) to the commerce.js:
`python3 populate_database.py <YOUR-PRIVATE-KEY>`

All the pictures are stored in /pictures folder.