## We specify the base image we need for our
## go application
FROM golang:latest

# RUN mkdir /usr/app/lookup/go

WORKDIR /usr/app/lookup/go

# COPY go.mod .
# COPY go.sum .
# RUN go mod download

COPY . .

RUN go build -o main .

EXPOSE 8080

CMD ["./main"]