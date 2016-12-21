FROM ruby:2.2.0
MAINTAINER Matthieu ANTOINE <matthieu@matthieu-antoine.me>


ADD . /app
WORKDIR /app
RUN apt-get update && apt-get install -y  nodejs
 
RUN bundle config git.allow_insecure true && \
    bundle install --without sqlite mysql development test --deployment



EXPOSE 3000


# Or "CMD /etc/init.d/postgresql restart && passenger start -a 0.0.0.0 -p 3000 -e production --friendly-error-pages" for debug error



