COMPOSE_FILE_DEV= ../docker-compose.yml
COMPOSE_FILE=docker/development.yml
ENV_FILE=dev.env
ENV_DEPLOY_FILE=deploy.env

up_dev_build:
	docker-compose -f $(COMPOSE_FILE_DEV) --env-file $(ENV_DEPLOY_FILE) up -d --build

up_build:
	docker-compose -f $(COMPOSE_FILE) --env-file $(ENV_FILE) up -d --build

build:
	docker-compose -f $(COMPOSE_FILE) --env-file $(ENV_FILE)  build

up:
	docker-compose -f$(COMPOSE_FILE) --env-file $(ENV_FILE) up

down:
	docker-compose -f $(COMPOSE_FILE) down

stop:
	docker-compose -f $(COMPOSE_FILE) stop

clean:
	docker-compose -f $(COMPOSE_FILE) --env-file $(ENV_FILE) down || true
	docker volume rm zetatech_zetatech_dev_postgres_data || true
	docker volume rm zetatech_zetatech_dev_static_files || true


gen_data:
	docker-compose -f $(COMPOSE_FILE) --env-file $(ENV_FILE) exec zetatech_api python manage.py fake_data
