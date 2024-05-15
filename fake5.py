import random
import mysql.connector

# Kết nối đến cơ sở dữ liệu
mydb = mysql.connector.connect(
    host="localhost", user="root", password="123456", database="ecom2"
)
mycursor = mydb.cursor()

# Lấy danh sách id của các đơn đặt hàng
mycursor.execute("SELECT order_id FROM app_orders")
order_ids = mycursor.fetchall()

# Lấy danh sách id của các sản phẩm
mycursor.execute("SELECT product_id, buy_price FROM app_Product")
products = mycursor.fetchall()

i = 3
# Lặp qua mỗi đơn đặt hàng
for order_id in order_ids:
    # Số lượng mặt hàng ngẫu nhiên từ 1 đến 5
    num_items = random.randint(1, 5)
    # Chọn ngẫu nhiên các sản phẩm từ danh sách
    selected_products = random.sample(products, num_items)
    # Chèn dữ liệu vào bảng Order_Medicine
    for med_id, price in selected_products:
        id = i
        i += 1
        quantity = random.randint(1, 10)
        total_price = quantity * price
        sql = "INSERT INTO app_order_product (id, order_id, product_id, quantity, price) VALUES (%s, %s, %s, %s, %s)"
        val = (id, order_id[0], med_id, quantity, total_price)
        mycursor.execute(sql, val)

# Lưu các thay đổi và đóng kết nối
mydb.commit()
mydb.close()

print("Dữ liệu đã được chèn vào bảng Order_Product.")
