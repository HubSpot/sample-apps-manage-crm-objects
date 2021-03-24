# Load the gem
require 'hubspot-api-client'
require 'dotenv'

Dotenv.load

# Setup authorization
Hubspot.configure do |config|
  # Configure API key authorization: hapikey
  config.api_key['hapikey'] = ENV['HUBSPOT_API_KEY']
end
