FROM ruby:2.3.3
MAINTAINER Clayton Silva <clayton.silva@prodest.es.gov.br>


ADD . /app
WORKDIR /app
RUN apt-get update && apt-get install -y  nodejs
 
RUN bundle config git.allow_insecure true && \
    bundle install --without sqlite mysql development test --deployment


COPY docker-entrypoint.sh /
RUN chmod a+x /docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/docker-entrypoint.sh"]



