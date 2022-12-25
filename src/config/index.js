const apisURL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:4000/v1"
    : "https://my-apis.bitandpixelhub.com/v1";

module.exports = {
  APP_NAME: "Quote App",
  APIS_URL: apisURL,
};
