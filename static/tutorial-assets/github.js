const passport = require('passport');
var GithubStrategy = require('passport-github2').Strategy;
const loginWithIdp = require('./loginWithIdp');
const { createIdToken } = require('../../api-util/idToken');

const radix = 10;
const PORT = parseInt(process.env.REACT_APP_DEV_API_SERVER_PORT, radix);
const rootUrl = process.env.REACT_APP_MARKETPLACE_ROOT_URL;
const clientID = process.env.REACT_APP_GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

// Identity provider and identity provider client information. They should
// match to an identity provider client "Client ID" and "IdP ID" in Console.
const idpClientId = process.env.GITHUB_PROXY_CLIENT_ID;
const idpId = process.env.GITHUB_PROXY_IDP_ID;

let callbackURL = null;

const useDevApiServer = process.env.NODE_ENV === 'development' && !!PORT;

if (useDevApiServer) {
  callbackURL = `http://localhost:${PORT}/api/auth/github/callback`;
} else {
  callbackURL = `${rootUrl}/api/auth/github/callback`;
}

const strategyOptions = {
  clientID,
  clientSecret,
  scope: [ 'user:email' ],
  callbackURL,
  passReqToCallback: true,
};

const verifyCallback = (req, accessToken, refreshToken, profile, done) => {
  // We can can use util function to generate id token to match OIDC so that we can use
  // our custom id provider in Sharetribe

  /**
  * Note: The Github SSO profile does not expose the user's email address or their name.
  * This means that they need to fill in all details in the confirm view.
  * However, depending on the SSO provider you are using, you might be able to 
  * extract values for the following attributes from the 'profile' parameter.
  * You can then pass them to the 'done' function within userData below.
  */
  
  // const firstName = '';
  // const lastName = '';
  // const email = '';
  // const emailVerified = false;

  const user = {
    userId: profile.id,
    // firstName,
    // lastName,
    // email,
    // emailVerified
  };

  const state = req.query.state;
  const queryParams = JSON.parse(state);

  const { from, defaultReturn, defaultConfirm } = queryParams;

  // These keys are used for signing the ID token (JWT)
  // When you store them to environment variables you should replace
  // any line breaks with '\n'.
  // You should also make sure that the key size is big enough.
  const rsaPrivateKey = process.env.RSA_PRIVATE_KEY;
  const keyId = process.env.KEY_ID;

  createIdToken(idpClientId, user, { signingAlg: 'RS256', rsaPrivateKey, keyId })
    .then(idpToken => {
      const userData = {
        // email,
        // firstName,
        // lastName,
        idpToken,
        from,
        defaultReturn,
        defaultConfirm,
      };
      done(null, userData);
    })
    .catch(e => console.error(e));
};

// ClientId is required when adding a new Github strategy to passport
if (clientID) {
  passport.use(new GithubStrategy(strategyOptions, verifyCallback));
}

exports.authenticateGithub = (req, res, next) => {
  const from = req.query.from ? req.query.from : null;
  const defaultReturn = req.query.defaultReturn ? req.query.defaultReturn : null;
  const defaultConfirm = req.query.defaultConfirm ? req.query.defaultConfirm : null;

  const params = {
    ...(!!from && { from }),
    ...(!!defaultReturn && { defaultReturn }),
    ...(!!defaultConfirm && { defaultConfirm }),
  };

  const paramsAsString = JSON.stringify(params);

  passport.authenticate('github', {
    scope: [ 'user:email' ],
    state: paramsAsString,
  })(req, res, next);
};

// Use custom callback for calling loginWithIdp enpoint
// to log in the user to Sharetribe with the data from Github
exports.authenticateGithubCallback = (req, res, next) => {
  passport.authenticate('github', function(err, user) {
    loginWithIdp(err, user, req, res, idpClientId, idpId);
  })(req, res, next);
};
