#!/bin/bash

cd deployments

cp example.env dev.env

docker compose -f docker/development.yml --env-file dev.env up -d --build

docker compose -f docker/development.yml --env-file dev.env exec zetatech_api python manage.py fake_data
