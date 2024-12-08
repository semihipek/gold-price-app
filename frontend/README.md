# API Documentation

## Endpoints

### `/products`
- `GET`: Fetch all products
- `POST`: Add a new product
- `PUT`: Update an existing product
- `DELETE`: Remove a product by ID

### `/gold-price`
- `GET`: Fetch the current gold price

## Example Request/Response

**POST `/products`**
Request:
```json
{
  "id": 3,
  "name": "Diamond Ring",
  "price": 5000,
  "color": "gold",
  "popularity": 5
}
