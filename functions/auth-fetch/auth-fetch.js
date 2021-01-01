// for a full working demo of Netlify Identity + Functions, see https://netlify-gotrue-in-react.netlify.com/

const fetch = require("node-fetch");

const handler = async function (event, context) {
  const headers = {
    Accept: "application/json",
    Authorization: `Client-ID${process.env.REACT_APP_WEATHER_API_KEY}`,
  };

  if (!context.clientContext && !context.clientContext.identity) {
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({
        msg: "Crap, its broken... AGAIN!",
      }),
    };
  }
  const { identity, user } = context.clientContext;
  try {
    const response = await fetch("http://api.openweathermap.org/data/2.5/", {
      headers,
    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ identity, user, msg: data.value }),
    };
  } catch (error) {
    // output to netlify function log
    console.log(error);
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    };
  }
};

module.exports = { handler };
