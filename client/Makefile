docker-build:
	docker build -t quiz-maker_client .
docker-run:
	docker run -p 3000:3000 --env-file .env -d --rm --name quiz-maker_client quiz-maker_client
docker-stop:
	docker stop quiz-maker_client