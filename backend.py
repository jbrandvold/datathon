from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torch.nn as nn
import numpy as np

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Define the same model class
class MultiClassPerceptron(nn.Module):
    def __init__(self, input_size):
        super(MultiClassPerceptron, self).__init__()
        hidden_layer_1 = input_size // 2
        hidden_layer_2 = input_size // 4
        self.fc1 = nn.Linear(input_size, hidden_layer_1)
        self.fc2 = nn.ReLU()
        self.fc3 = nn.Dropout(p=0.5)
        self.fc4 = nn.Linear(hidden_layer_1, hidden_layer_2)
        self.fc5 = nn.ReLU()
        self.fc6 = nn.Dropout(p=0.5)
        self.fc7 = nn.Linear(hidden_layer_2, 1)

    def forward(self, x):
        x = self.fc1(x)
        x = self.fc2(x)
        x = self.fc3(x)
        x = self.fc4(x)
        x = self.fc5(x)
        x = self.fc6(x)
        x = self.fc7(x)
        return x

# Load trained model
MODEL_PATH = "../full_model.pth"
INPUT_SIZE = 96  # Adjust if different
model = torch.load(MODEL_PATH, weights_only=False)
model.eval()  # Set model to evaluation mode

# API route
@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get input data
        data = request.get_json()
        print(data)
        features = np.array(data["features"], dtype=np.float32).reshape(1, -1)

        # Convert to PyTorch tensor
        input_tensor = torch.tensor(features)

        # Make prediction
        prediction = model(input_tensor).item()

        return jsonify({"prediction": prediction})

    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)