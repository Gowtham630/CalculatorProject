from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
import math

app = Flask(__name__)
CORS(app)

# MongoDB configuration with error handling
try:
    client = MongoClient('mongodb://localhost:27017/')
    db = client['calculator_db']
    calculations = db['calculations']
    client.admin.command('ping')  # Test connection
    print("Connected to MongoDB successfully!")
except Exception as e:
    print(f"Failed to connect to MongoDB: {e}")

def evaluate_math_function(func, value):
    try:
        value = float(value)
        if func == 'sin':
            return math.sin(math.radians(value))
        elif func == 'cos':
            return math.cos(math.radians(value))
        elif func == 'tan':
            return math.tan(math.radians(value))
        elif func == 'sqrt':
            return math.sqrt(value)
        elif func == 'log':
            return math.log10(value)
    except Exception as e:
        raise ValueError(f"Error in {func}: {str(e)}")

def evaluate_expression(expression):
    # Handle math functions
    for func in ['sin', 'cos', 'tan', 'sqrt', 'log']:
        if func in expression:
            try:
                start = expression.find(func + '(')
                if start != -1:
                    end = expression.find(')', start)
                    if end != -1:
                        value = evaluate_expression(expression[start + len(func) + 1:end])
                        result = evaluate_math_function(func, value)
                        expression = expression[:start] + str(result) + expression[end + 1:]
            except Exception as e:
                raise ValueError(f"Error evaluating {func}: {str(e)}")

    def precedence(op):
        if op in {'+', '-'}:
            return 1
        if op in {'*', '/'}:
            return 2
        if op == '^':
            return 3
        return 0

    def apply_operator(operators, values):
        if not operators:
            return
        
        op = operators.pop()
        b = values.pop()
        a = values.pop()
        
        try:
            if op == '+':
                values.append(a + b)
            elif op == '-':
                values.append(a - b)
            elif op == '*':
                values.append(a * b)
            elif op == '/':
                if b == 0:
                    raise ValueError("Division by zero")
                values.append(a / b)
            elif op == '^':
                values.append(a ** b)
        except Exception as e:
            raise ValueError(f"Error in operation {a} {op} {b}: {str(e)}")

    def parse_number(s, i):
        num = 0
        decimal = 0
        decimal_place = 0.1
        
        while i < len(s) and (s[i].isdigit() or s[i] == '.'):
            if s[i] == '.':
                decimal = 1
            elif decimal == 0:
                num = num * 10 + int(s[i])
            else:
                num += int(s[i]) * decimal_place
                decimal_place *= 0.1
            i += 1
        return num, i

    operators = []
    values = []
    i = 0
    
    while i < len(expression):
        char = expression[i]
        
        if char.isspace():
            i += 1
            continue
            
        if char.isdigit() or char == '.':
            num, i = parse_number(expression, i)
            values.append(num)
            continue
            
        if char in {'+', '-', '*', '/', '^'}:
            while (operators and operators[-1] != '(' and 
                   precedence(operators[-1]) >= precedence(char)):
                apply_operator(operators, values)
            operators.append(char)
            
        elif char == '(':
            operators.append(char)
            
        elif char == ')':
            while operators and operators[-1] != '(':
                apply_operator(operators, values)
            if operators:
                operators.pop()  # Remove '('
                
        i += 1
    
    while operators:
        apply_operator(operators, values)
    
    return values[0] if values else 0

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        data = request.get_json()
        expression = data.get('expression', '')
        result = evaluate_expression(expression)
        
        # Save calculation to MongoDB
        calculation = {
            'expression': expression,
            'result': result,
            'timestamp': datetime.utcnow()
        }
        try:
            calculations.insert_one(calculation)
        except Exception as e:
            print(f"Failed to save calculation: {e}")
        
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/history', methods=['GET'])
def get_history():
    try:
        # Get the last 10 calculations, sorted by timestamp
        history = list(calculations.find(
            {},
            {'_id': 0, 'expression': 1, 'result': 1, 'timestamp': 1}
        ).sort('timestamp', -1).limit(10))
        
        # Convert timestamp to string for JSON serialization
        for calc in history:
            calc['timestamp'] = calc['timestamp'].isoformat()
        
        return jsonify(history)
    except Exception as e:
        print(f"Failed to fetch history: {e}")
        return jsonify([])

if __name__ == '__main__':
    app.run(debug=True)
