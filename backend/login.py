"""
Functions for logging in and registering new users
"""
import backend.db_utils as db
from flask import request

class UserValidation:
    def __init__(self, user_name, password):
        self.user_name = user_name
        self.password = password

    @property
    def user_name(self):
        return self.user_name

    @user_name.setter
    def user_name(self, value):
        """
        Checks for length of user name for UserValidation instance
        """
        if len(value) > 15:
            raise ValueError("Username cannot exceed 15 characters.")
        self._user_name = value

    @property
    def password(self):
        return self._password

    @password.setter
    def password(self, value):
        """
        Checks for length of password for UserValidation instance
        """
        if len(value) >= 20 or len(value) < 4:
            raise ValueError("Password must be between 4 and 15 characters")
        self._password = value



