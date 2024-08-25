"""
Functions for logging in and registering new users
"""
import backend.db_utils as db
from flask import flask, request
from flask_login import LoginManager
from wtforms import Form, BooleanField, StringField, PasswordField, validators





@app.route('/login', methods=['GET', 'POST'])
def login():
    # Here we use a class of some kind to represent and validate our
    # client-side form data. For example, WTForms is a library that will
    # handle this for us, and we use a custom LoginForm to validate.
    form = LoginForm()
    if form.validate_on_submit():
        # Login and validate the user.
        # user should be an instance of your `User` class
        login_user(user)

        flask.flash('Logged in successfully.')

        next = flask.request.args.get('next')
        # url_has_allowed_host_and_scheme should check if the url is safe
        # for redirects, meaning it matches the request host.
        # See Django's url_has_allowed_host_and_scheme for an example.

        def url_has_allowed_host_and_scheme(url, allowed_hosts, require_https=False):
            """
            Return ``True`` if the url uses an allowed host and a safe scheme.

            Always return ``False`` on an empty url.

            If ``require_https`` is ``True``, only 'https' will be considered a valid
            scheme, as opposed to 'http' and 'https' with the default, ``False``.

            Note: "True" doesn't entail that a URL is "safe". It may still be e.g.
            quoted incorrectly. Ensure to also use django.utils.encoding.iri_to_uri()
            on the path component of untrusted URLs.
            """
            if url is not None:
                url = url.strip()
            if not url:
                return False
            if allowed_hosts is None:
                allowed_hosts = set()
            elif isinstance(allowed_hosts, str):
                allowed_hosts = {allowed_hosts}
            # Chrome treats \ completely as / in paths but it could be part of some
            # basic auth credentials so we need to check both URLs.
            return (
                url_has_allowed_host_and_scheme(url, allowed_hosts, require_https=require_https) and
                url_has_allowed_host_and_scheme(url.replace('\\', '/'), allowed_hosts, require_https=require_https)
            )

        if not url_has_allowed_host_and_scheme(next, request.host):
            return flask.abort(400)

        return flask.redirect(next or flask.url_for('index'))
    return flask.render_template('login.html', form=form)

login_manager = LoginManager()

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


class LoginForm(Form):
    username = StringField('Username', [validators.Length(min=4, max=15)])
    email = StringField('Email Address', [
        validators.Length(min=6, message=('Too short!'), max=50),
        validators.Email(message=('That\'s not a valid email address.'))])
    password = PasswordField('Password', [validators.Length(min=4, max=15)])

form = LoginForm()

