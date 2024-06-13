import mysql.connector
from faker import Faker
import random

# Connect to MySQL database
conn = mysql.connector.connect(
    host="localhost", user="root", password="123456", database="ecom2"
)
cursor = conn.cursor()
fake = Faker()

cursor.execute("DELETE FROM app_order_Product")
cursor.execute("DELETE FROM app_Product")
# Generate and insert approximately 200 records for Product
for i in range(0, 200):
    name = f"ProductName{i}"
    description = f"Description{i}"
    quantity = random.randint(400, 3000)
    category_id = random.randint(1, 10)
    img = f"anh/anh{random.randint(1,70)}.JPG"

    # Generate import_price and buy_price divisible by 1000
    base_price = (
        random.randint(30, 600) * 100000
    )  # Random integer between 100,000 and 600,000
    import_price = int(base_price / 100000.0)
    buy_price = (
        import_price + random.randint(20, 100)
    ) * 100000.0  # Add random amount, ensuring divisibility by 1000

    type_of_user_id = random.randint(1, 10)

    # Insert data into Medicine table
    sql = "INSERT INTO app_Product (product_id, name, description, quantity, category_id, img, import_price, buy_price, type_of_user_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
    val = (
        i + 1,
        name,
        description,
        quantity,
        category_id,
        img,
        base_price,
        buy_price,
        type_of_user_id,
    )
    cursor.execute(sql, val)

    # Commit the transaction
    conn.commit()

# Close the cursor and connection
cursor.close()
conn.close()

print("Records inserted successfully.")
