# SSO

We use local storage to store the user details returned from the server after login and registration.
An important piece of data is the JWT access token, which is used to make all the REST API calls.
The problem is, local storage is accessible only within (protocol, domain, port) tuple. For example,
if you create something in `http://localhost:3000`, you cannot access it in `http://localhost:3001`.
Even though the protocol and the domain are the same, according to the same-origin policy, they are
different.

Since we implement SSO, that is, the user signs in at `hubblesuite.com` and can access the subdomains
without having to login again, we need a way to access the JWT token from the subdomains. That is
where cross storage library comes into picture. It uses an iframe to implement something the library
calls a hub. In simple terms, a hub is _like_ a server running on the client side that helps us retrieve
and update items in the local storage from different subdomains. The implementation detail of the library
is a bit more complicated.
