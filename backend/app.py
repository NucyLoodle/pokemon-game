from flask import Flask, render_template, request, session
import flask
from flask_session import Session
import battle


app = Flask(__name__ ,
            static_url_path='',
            static_folder='../frontend/static',
            template_folder='../frontend/templates')


# CORS(app)
app.secret_key = 'BAD_SECRET_KEY'


@app.route("/")
def main():
    return render_template('index.html')
    
@app.route("/battle")
def battle_page():
    return render_template('battle.html') 

@app.route("/battle", methods=['POST', 'GET'])
def get_user_cpu_pokemon():
    return battle.get_pokemon_data()

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


if __name__ == '__main__':
    app.run(debug=True, port=5001)