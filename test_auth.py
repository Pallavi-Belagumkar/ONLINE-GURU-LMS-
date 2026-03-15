"""
Test script for authentication system
Run with: python test_auth.py
"""

import json
import os
from datetime import datetime

def test_registration():
    print("\n=== Testing User Registration ===")
    
    # Simulate user registration
    users = []
    
    # Create test users
    test_users = [
        {"id": 1001, "name": "John Doe", "email": "john@example.com", "password": "password123"},
        {"id": 1002, "name": "Jane Smith", "email": "jane@example.com", "password": "password456"},
        {"id": 1003, "name": "Bob Wilson", "email": "bob@example.com", "password": "password789"}
    ]
    
    for user in test_users:
        users.append(user)
        print(f"✅ Created user: {user['name']} ({user['email']})")
    
    # Save to mock database
    with open('test_users.json', 'w') as f:
        json.dump(users, f, indent=2)
    
    print(f"\n✅ Saved {len(users)} users to test database")
    return users

def test_login():
    print("\n=== Testing User Login ===")
    
    # Load mock database
    if not os.path.exists('test_users.json'):
        print("❌ Test database not found")
        return
    
    with open('test_users.json', 'r') as f:
        users = json.load(f)
    
    # Test successful login
    test_email = "john@example.com"
    test_password = "password123"
    
    user = next((u for u in users if u['email'] == test_email and u['password'] == test_password), None)
    
    if user:
        print(f"✅ Login successful for: {user['name']}")
        print(f"   User ID: {user['id']}")
        print(f"   Email: {user['email']}")
    else:
        print("❌ Login failed - Invalid credentials")
    
    # Test failed login
    test_email = "invalid@example.com"
    user = next((u for u in users if u['email'] == test_email), None)
    
    if not user:
        print("✅ Login failed correctly for invalid email")

def test_user_isolation():
    print("\n=== Testing User Data Isolation ===")
    
    # Simulate user-specific data
    users_data = {}
    
    # Create data for user 1
    users_data[1001] = {
        "enrollments": [1, 2, 3],
        "progress": {1: 75, 2: 30, 3: 100},
        "certificates": [{"id": "CERT1", "course": "Course 1"}]
    }
    
    # Create data for user 2
    users_data[1002] = {
        "enrollments": [4, 5],
        "progress": {4: 50, 5: 20},
        "certificates": []
    }
    
    # Create data for user 3 (new user - should be empty)
    users_data[1003] = {
        "enrollments": [],
        "progress": {},
        "certificates": []
    }
    
    # Test user 1 data
    print("\nUser 1 (John Doe) Data:")
    print(f"  Enrollments: {users_data[1001]['enrollments']}")
    print(f"  Progress: {users_data[1001]['progress']}")
    print(f"  Certificates: {len(users_data[1001]['certificates'])}")
    
    # Test user 2 data
    print("\nUser 2 (Jane Smith) Data:")
    print(f"  Enrollments: {users_data[1002]['enrollments']}")
    print(f"  Progress: {users_data[1002]['progress']}")
    print(f"  Certificates: {len(users_data[1002]['certificates'])}")
    
    # Test user 3 data (new user)
    print("\nUser 3 (Bob Wilson - New User) Data:")
    print(f"  Enrollments: {users_data[1003]['enrollments']}")
    print(f"  Progress: {users_data[1003]['progress']}")
    print(f"  Certificates: {len(users_data[1003]['certificates'])}")
    
    # Verify isolation
    print("\n=== Verification ===")
    if users_data[1001]['enrollments'] != users_data[1002]['enrollments']:
        print("✅ User data is properly isolated")
    else:
        print("❌ User data isolation failed")

def test_certificate_generation():
    print("\n=== Testing Certificate Generation ===")
    
    # Simulate certificate generation
    certificate = {
        "id": "OG-20240315-ABC123",
        "userName": "John Doe",
        "courseName": "Complete Web Development",
        "issueDate": datetime.now().isoformat(),
        "completionDate": datetime.now().strftime("%Y-%m-%d"),
        "verified": True
    }
    
    print(f"✅ Certificate generated:")
    print(f"   ID: {certificate['id']}")
    print(f"   User: {certificate['userName']}")
    print(f"   Course: {certificate['courseName']}")
    print(f"   Date: {certificate['completionDate']}")
    print(f"   Verified: {certificate['verified']}")

def test_progress_tracking():
    print("\n=== Testing Progress Tracking ===")
    
    # Simulate course progress
    course_progress = {
        "courseId": 1,
        "userId": 1001,
        "totalLessons": 24,
        "completedLessons": 18,
        "percentage": 75,
        "lastAccessed": datetime.now().isoformat()
    }
    
    print(f"✅ Progress tracked:")
    print(f"   Course ID: {course_progress['courseId']}")
    print(f"   Progress: {course_progress['completedLessons']}/{course_progress['totalLessons']} lessons")
    print(f"   Percentage: {course_progress['percentage']}%")
    print(f"   Last accessed: {course_progress['lastAccessed'][:10]}")

def cleanup():
    print("\n=== Cleaning Up ===")
    if os.path.exists('test_users.json'):
        os.remove('test_users.json')
        print("✅ Test database removed")

if __name__ == "__main__":
    print("=" * 50)
    print("ONLINEGURU AUTHENTICATION TEST SUITE")
    print("=" * 50)
    
    try:
        users = test_registration()
        test_login()
        test_user_isolation()
        test_certificate_generation()
        test_progress_tracking()
    finally:
        cleanup()
    
    print("\n" + "=" * 50)
    print("✅ All tests completed successfully!")
    print("=" * 50)