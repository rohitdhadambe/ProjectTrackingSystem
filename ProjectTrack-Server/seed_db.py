#!/usr/bin/env python
"""
Database seed script to add test data for Admin and Investigator users
"""
import sys
import os
from datetime import datetime, date

# Add the project root to the path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from app import create_app
from app.models import Admin, Investigator
from app.extensions import db

def seed_database():
    """Add test data to the database"""
    app = create_app()
    
    with app.app_context():
        # Count existing records
        admin_count = Admin.query.count()
        investigator_count = Investigator.query.count()
        
        print(f"Current admin records: {admin_count}")
        print(f"Current investigator records: {investigator_count}")
        
        # Create test admin
        test_admin = Admin(
            admin_name="Test Admin",
            email="admin@test.com",
            phone_no="9876543210",
            dob=date(1990, 1, 15),
            address="123 Admin Street",
            username="testadmin",
            password="admin123",  # Note: In production, this should be hashed
            experience="10 years",
            account_number="ACC12345",
            security_clearance="Top Secret",
            highest_qualification="Master's",
            designation="Administrator",
            authority="Admin Head",
            identification="ADMIN001",
            department="Administration"
        )
        db.session.add(test_admin)
        print("✓ Added test Admin user")
        
        # Create test investigator
        test_investigator = Investigator(
            investigator_name="Test Investigator",
            email="investigator@test.com",
            phone_no="9876543211",
            dob=date(1992, 5, 20),
            address="456 Investigator Ave",
            username="testinvestigator",
            password="inv123",  # Note: In production, this should be hashed
            experience="5 years",
            account_number="ACC54321",
            security_clearance="Secret",
            highest_qualification="Bachelor's",
            designation="Investigator",
            authority="Investigator",
            identification="INV001",
            department="Investigation"
        )
        db.session.add(test_investigator)
        print("✓ Added test Investigator user")
        
        db.session.commit()
        print("\n✓ Database seeding completed successfully!")
        print("\nTest credentials:")
        print("-" * 50)
        print("Admin Login:")
        print("  Email: admin@test.com")
        print("  Password: admin123")
        print("  Role: Admin Console")
        print("-" * 50)
        print("Investigator Login:")
        print("  Email: investigator@test.com")
        print("  Password: inv123")
        print("  Role: Project Investigator")
        print("-" * 50)

if __name__ == '__main__':
    seed_database()
