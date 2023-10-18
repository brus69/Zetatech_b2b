#!/bin/bash

set -e

cmd="$*"


# DB
>&2 echo "Waiting for DB..."
until nc -z "$DB_HOST" "$DB_PORT"; do
  >&2 echo "DB is unavailable - sleeping"
  sleep 2
done

>&2 echo "DB is up - executing command"

if [ "$SERVICE_NAME" = "zetatech_api" ]; then
  python manage.py migrate
  python manage.py collectstatic --noinput
fi

exec $cmd
