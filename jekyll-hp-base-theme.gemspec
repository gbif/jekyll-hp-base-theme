# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "jekyll-hp-base-theme"
  spec.version       = "0.1.0"
  spec.authors       = ["GBIF Secretariat"]
  spec.email         = ["informatics@gbif.org"]

  spec.summary       = "Jekyll theme for research project websites"
  spec.homepage      = "https://github.com/gbif/jekyll-hp-base-theme"
  spec.license       = "Apache License 2.0"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_plugins|_sass|LICENSE|README)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4.1.1"

  spec.add_development_dependency "bundler", "~> 2.4.13"
end
