"""
Functions for logging in and registering new users
"""
import backend.db_utils as db
from flask import request

class UserValidation:
    def __init__(self, first_name, last_name, email, password):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password

    @property
    def first_name(self):
        return self.first_name

    @first_name.setter
    def first_name(self, value):
        """
        Checks for length of first name for UserValidation instance
        """
        if len(value) > 20:
            raise ValueError("First name cannot exceed 20 characters.")
        self._first_name = value

    @property
    def last_name(self):
        return self.last_name

    @last_name.setter
    def last_name(self, value):
        """
        Checks for length of last name for UserValidation instance
        """
        if len(value) > 20:
            raise ValueError("Last name cannot exceed 20 characters.")
        self._last_name = value

    @property
    def email(self):
        return self._email

    @email.setter
    def email(self, value):
        """
        Checks if user has entered a valid email address for UserValidation instance
        """
        regex = "[^@]+@[^@]+\.[^@]+"
        if not re.match(regex, value) or len(value) > 30:
            raise ValueError("Enter a valid email address")
        self._email = value

    @property
    def password(self):
        return self._password

    @password.setter
    def password(self, value):
        """
        Checks for length of password for UserValidation instance
        """
        if len(value) >= 20 or len(value) < 4:
            raise ValueError("Password must be between 4 and 20 characters")
        self._password = value



