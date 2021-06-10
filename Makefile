build:
	docker build -t getprintv2client:latest .

run:
	docker run --env-file ./.env.local -v $$(pwd):/app -d -p 3000:3000 --name Getprint-v2-Client getprintv2client:latest