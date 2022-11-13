run:
	docker-compose -f docker-compose-online.yml up -d --build

stop:
	docker-compose -f docker-compose-online.yml down