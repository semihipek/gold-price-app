from flask import Flask, jsonify, request
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

with open('products.json') as f:
    products = json.load(f)

def get_gold_price():
    return 60.0  # 1 gram altın fiyatı (USD)

def calculate_price(popularity_score, weight, gold_price):
    return round((popularity_score + 1) * weight * gold_price, 2)

@app.route('/products', methods=['GET'])
def get_products():
    gold_price = get_gold_price()
    for product in products:
        product['price'] = calculate_price(product['popularityScore'], product['weight'], gold_price)
    return jsonify(products)

@app.route('/products/filter', methods=['GET'])
def filter_products():
    gold_price = get_gold_price()
    for product in products:
        product['price'] = calculate_price(product['popularityScore'], product['weight'], gold_price)

    min_price = float(request.args.get('min_price', 0))
    max_price = float(request.args.get('max_price', float('inf')))
    filtered_products = [product for product in products if min_price <= product.get('price', 0) <= max_price]
    return jsonify(filtered_products)

if __name__ == '__main__':
    app.run(debug=True)
