import random
import uuid

# List of laptop brands and their ids
brands = [
    (1, "Apple", "https://example.com/images/apple_laptop.png"),
    (2, "Dell", "https://example.com/images/dell_laptop.png"),
    (3, "HP (Hewlett-Packard)", "https://example.com/images/hp_laptop.png"),
    (4, "Lenovo", "https://example.com/images/lenovo_laptop.png"),
    (5, "Asus", "https://example.com/images/asus_laptop.png"),
    (6, "Acer", "https://example.com/images/acer_laptop.png"),
    (7, "Microsoft", "https://example.com/images/microsoft_laptop.png"),
    (8, "MSI (Micro-Star International)", "https://example.com/images/msi_laptop.png"),
    (9, "Razer", "https://example.com/images/razer_laptop.png"),
    (10, "Samsung", "https://example.com/images/samsung_laptop.png"),
]

# List of user types and their ids
user_types = [
    (1, "Student"),
    (2, "Professional"),
    (3, "Gamer"),
    (4, "Developer"),
    (5, "Designer"),
]


# Function to generate a random laptop product
def generate_product(product_id):
    brand_id, brand_name, img_url = random.choice(brands)
    user_type_id, user_type_name = random.choice(user_types)
    name = f"{brand_name} Laptop {uuid.uuid4().hex[:6]}"
    description = f"This is a {brand_name} laptop suitable for {user_type_name}."
    quantity = random.randint(1, 100)
    import_price = round(random.uniform(300, 1500), 2)
    buy_price = round(import_price * random.uniform(1.1, 1.5), 2)

    return {
        "product_id": product_id,
        "name": name,
        "description": description,
        "quantity": quantity,
        "category_id": brand_id,
        "img": img_url,
        "import_price": import_price,
        "buy_price": buy_price,
        "type_of_user_id": user_type_id,
    }


# Generate 200 products
products = [generate_product(product_id) for product_id in range(1, 201)]

# Display the first 5 products to check
for product in products[:5]:
    print(product)
