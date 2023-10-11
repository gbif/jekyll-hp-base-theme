require 'securerandom'

module Jekyll
  module RandomNumber
      def random_hex(n)
        SecureRandom.hex(n)
      end
  end
end

Liquid::Template.register_filter(Jekyll::RandomNumber)
