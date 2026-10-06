LOCAL_DEV_PATH = $(shell pwd)
DOCKER_COMPOSE_FILE := $(LOCAL_DEV_PATH)/docker-compose.yml

DOCKER_COMPOSE_CMD := docker compose -p vnfo -f $(DOCKER_COMPOSE_FILE)

.PHONY: run
run: 
	COMPOSE_DOCKER_CLI_BUILD=1 $(DOCKER_COMPOSE_CMD) up -d 


.PHONY: stop
stop:
	$(DOCKER_COMPOSE_CMD) stop


.PHONY: down
down:
	$(DOCKER_COMPOSE_CMD) down --remove-orphans --rmi all
