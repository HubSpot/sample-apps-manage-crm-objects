require_relative 'config'
require 'optparse'
require 'ostruct'
require 'json'

class Cli
  REQUIRED_PARAMS = {
    archive: %i(object_type object_id),
    create: %i(object_type simple_public_object_input),
    get_by_id: %i(object_type object_id),
    get_page: %i(object_type),
    update: %i(object_type object_id simple_public_object_input)
  }.freeze

  def initialize(options)
    @options = options
    @method = options[:method]&.to_sym
  end

  def run
    validate
    call_api
  end

  private

  attr_reader :options, :method

  def validate
    raise ArgumentError 'Please, provide method to call with -m or --method' unless method
    missing_params = REQUIRED_PARAMS[method] - options.to_h.keys
    raise ArgumentError "Please, provide missing params #{missing_params} for the method. Use help (-h) if you need." if missing_params.any?
  end

  def call_api
    api = Hubspot::Crm::Objects::BasicApi.new
    api.public_send(method, *params)
  end

  def params
    required_params = REQUIRED_PARAMS[method]
    mapped_params = required_params.map { |param| options[param] }
    opts = options[:opts] || {}
    opts[:auth_names] = 'hapikey'
    mapped_params << opts
    mapped_params
  end
end

options = OpenStruct.new
OptionParser.new do |opt|
  opt.on('-m', '--method METHOD', 'Method to run') { |o| options.method = o }
  opt.on('-t', '--type TYPE', 'The type of object') { |o| options.object_type = o }
  opt.on('-i', '--id ID', 'The id of object') { |o| options.object_id = o }
  opt.on('-p', '--properties PROPERTIES', 'Properties of object') { |o| options.simple_public_object_input = Hubspot::Crm::Objects::SimplePublicObjectInput.new(properties: JSON.parse(o)) }
  opt.on('-o', '--options OPTIONS', 'Options to pass') { |o| options.opts = JSON.parse(o) }
end.parse!

p Cli.new(options).run
