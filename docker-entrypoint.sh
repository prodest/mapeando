#!/bin/bash

set -e

sed -i "s/<%= ENV\[\"SECRET_KEY_BASE\"\] %>/`bin/rake secret`/g" /app/config/secrets.yml

if [ "$1" = 'migrate' ]; then
    rake db:create
    rake db:schema:load
else
    rake db:migrate
fi

rake assets:precompile
rails server -b 0.0.0.0
