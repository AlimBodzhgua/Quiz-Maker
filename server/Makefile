docker-build:
	docker build -t quiz-maker_server .
docker-run:
	docker run -p 4000:4000 --env-file .env -d --rm --name quiz-maker_server quiz-maker_server
docker-stop:
	docker stop quiz-maker_server