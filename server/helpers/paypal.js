const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "AR-iY5gcUbA9sDYXCfnuehnIOvfJ3FCePnfCzEQj3lC_Je_G6_Maw5wgBaP69-l8frERxW55unqBQL39",
  client_secret: "EGelDHQXHJn6iE2sgAqNvoZJOPemRVOcpkHN6N3w4PY2rXhpZ5EQuuSSDU3xt4Jyu0yTXXrJwQVTz7EM",
});

module.exports = paypal;
