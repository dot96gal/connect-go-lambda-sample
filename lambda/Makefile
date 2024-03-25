.PHONY: buf-lint
buf-lint:
	buf lint

.PHONY: buf-generate
buf-generate:
	buf generate

.PHONY: lint
lint:
	golangci-lint run ./...

.PHONY: build
build:
	CGO_ENABLED=0 go build -o ./build/app .

.PHONY: dev
dev:
	go run ./...

.PHONY: greet-curl
greet-curl:
	curl \
		--header "Content-Type: application/json" \
		--data '{"name": "curl"}' \
		http://localhost:8080/greet.v1.GreetService/Greet

.PHONY: greet-grpc
greet-grpc: SHELL:=/bin/bash
greet-grpc:
	grpcurl \
		-protoset <(buf build -o -) \
		-plaintext \
		-d '{"name": "grpcurl"}' \
		localhost:8080 greet.v1.GreetService/Greet

.PNOHY: docker-build
docker-build:
	docker build -f ./docker/Dockerfile -t connect-go-lambda-sample:latest .

.PHONY: docker-run
docker-run:
	docker run -p 8080:8080 connect-go-lambda-sample:latest
