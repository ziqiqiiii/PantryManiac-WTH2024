import json
from random import randint, choice
from datetime import datetime, timedelta

# Enum categories for food
FOOD_CATEGORIES = {
    "FRUITS": "Fruits",
    "VEGETABLES": "Vegetables",
    "DAIRY": "Dairy",
    "MEAT": "Meat",
    "SEAFOOD": "Seafood",
    "SNACKS": "Snacks",
}

# Generate dummy data
def generate_dummy_data():
    data = []
    for i in range(1, 51):
        item = {
            "id": i,
            "name": f"Item {i}",
            "quantity": randint(1, 100),
            "expiry/best-before-date": (datetime.now() + timedelta(days=randint(1, 3650))).strftime("%d/%m/%Y"),
            "category": choice(list(FOOD_CATEGORIES.values())),
            "refrigerated": choice([True, False]),
        }
        data.append(item)
    return data

dummy_data = generate_dummy_data()

# Write the dummy data to a JSON file in the current directory
file_name = "dummy_food_data.json"
with open(file_name, "w") as json_file:
    json.dump(dummy_data, json_file, indent=4)

file_name

