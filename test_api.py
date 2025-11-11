import requests
import json

BASE_URL = "http://127.0.0.1:5000"

def test_endpoints():
    print("=" * 50)
    print("Testing API Endpoints")
    print("=" * 50)
    
    # Test investigator endpoint
    print("\n1. Testing /api/investigator endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/api/investigator")
        print(f"Status: {response.status_code}")
        data = response.json()
        print(f"Response type: {type(data)}")
        print(f"Number of investigators: {len(data) if isinstance(data, list) else 'N/A'}")
        if isinstance(data, list) and len(data) > 0:
            print(f"First investigator: {json.dumps(data[0], indent=2, default=str)}")
        else:
            print("No investigators found in database")
    except Exception as e:
        print(f"Error: {e}")
    
    # Test admin endpoint
    print("\n2. Testing /api/admin endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/api/admin")
        print(f"Status: {response.status_code}")
        data = response.json()
        print(f"Response type: {type(data)}")
        print(f"Number of admins: {len(data) if isinstance(data, list) else 'N/A'}")
        if isinstance(data, list) and len(data) > 0:
            print(f"First admin: {json.dumps(data[0], indent=2, default=str)}")
        else:
            print("No admins found in database")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_endpoints()
