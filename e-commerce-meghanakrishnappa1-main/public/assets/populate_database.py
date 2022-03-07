import sys
import base64
import json
import requests
from requests.structures import CaseInsensitiveDict

if len(sys.argv) > 1:
    APIKEY=sys.argv[1]
else:
    print("An API key is needed.")
    exit()

pictures_path='./pictures/'
products_file=open('products.json', 'r')
products = json.load(products_file)

headers = CaseInsensitiveDict()
headers["Content-Type"] = "application/json"
headers['X-Authorization'] = APIKEY
for product in products:
    assets=[]
    for picture in product["pictures"]:
        data = open(pictures_path+picture, "rb").read()
        encoded = base64.b64encode(data)
        print(picture)
        r = requests.post('https://api.chec.io/v1/assets', headers=headers, json={"filename":picture,'contents':encoded})
        print(r.text)
        response = json.loads(r.text)
        asset_id = response["id"]
        assets.append({"id":asset_id})

    product_dict = {
        "product": {
            "name": product["name"],
            "price": product["price"],
            "description": product["description"]
        },
        "assets": assets
    }
    product_request = requests.post('https://api.chec.io/v1/products', headers=headers, json=product_dict)
    print(product_request.text)