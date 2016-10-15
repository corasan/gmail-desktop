const TOKEN_DIR = process.env.HOME || process.env.HOMEPATH;

// Constants containing Google credentials and path where tokens are saved
module.exports = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REDIRECT_URL: process.env.REDIRECT_URL,
  TOKEN_PATH: TOKEN_DIR + '\\' + 'gmail-token.json',
  SCOPES: ['https://www.googleapis.com/auth/gmail.readonly']
}
