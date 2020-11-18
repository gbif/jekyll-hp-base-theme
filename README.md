# GBIF hosted portal theme

A jekyll theme for hosted websites - under development

# install and start
See https://jekyllrb.com/ for details on using Jekyll

```
gem install bundler jekyll
```

For development start with
```
bundle exec jekyll serve
# OR
docker run --rm --volume="$PWD:/srv/jekyll" --volume="$PWD/vendor/bundle:/usr/local/bundle" --env JEKYLL_ENV=development -p 4000:4000 jekyll/jekyll:4.1.0 jekyll serve
```

To build
```
bundle exec jekyll build
```

## Acknowledgement
This project was inspired by [Petridish](https://github.com/peterdesmet/petridish) - Jekyll theme for research project websites.