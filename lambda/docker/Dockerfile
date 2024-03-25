FROM golang:1.22.1 as builder

WORKDIR /workspace

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 go build -o app .


FROM gcr.io/distroless/static-debian12

WORKDIR /workspace

COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.1 /lambda-adapter /opt/extensions/lambda-adapter
COPY --from=builder /workspace/app ./app

EXPOSE 8080

CMD ["./app"]
