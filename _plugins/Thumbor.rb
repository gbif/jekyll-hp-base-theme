require "liquid"
require 'yaml'
require "ruby-thumbor"
require 'uri'

module Jekyll
  module ThumborTag
    class ThumborTag < Liquid::Tag

      def initialize(tag_name, text, tokens)
        super
        
        @url, @paramString = text.split(', ', 2) # extract the first string before the comma as the image url
        @parameters = {}

        if !@paramString.nil?
          @parameters = YAML.load('{' + @paramString + '}') # parse the string as yaml
          @parameters.each do |key, val|
            if val.nil? # if no value provided, then assume boolean true instead of nil
              @parameters[key] = true
            end
          end
        end
      end

    def render(context)
      url = Liquid::Template.parse(@url).render context
      url = URI.encode_www_form_component(url)
      @config = context.registers[:site].config['thumbor']

        image = Thumbor::Cascade.new(@config['key'], url)
        
        @parameters.each do |key, val|
          image.send(key, *val)
        end

        image_url = image.generate

        "#{@config['url']}#{image_url}"
      end
    end
  end
end

Liquid::Template.register_tag('thumbor', Jekyll::ThumborTag::ThumborTag)
