# Load the gem
require 'hubspot-api-client'
require 'dotenv'

Dotenv.load

def access_token
  ENV['ACCESS_TOKEN']
end
