# Makefile for Node.js Docker lifecycle
APP_NAME = mcp-server
VERSION_BASE = v2.0.1
DATE_TAG = $(shell date +%Y%m%d)
VERSION = $(VERSION_BASE)-$(DATE_TAG)
IMAGE = yanyuit/$(APP_NAME):$(VERSION)

build:
    docker buildx build \
        --platform linux/amd64 \
        -t $(IMAGE) \
        --load .

push:
    docker buildx build \
        --platform linux/amd64 \
        -t $(IMAGE) \
        --push .

run:
    docker run -d \
        --name $(APP_NAME) \
        --env-file .env \
        -p 8080:8080 \
        -v $(PWD)/logs:/app/logs \
        $(IMAGE)

clean:
    docker rm -f $(APP_NAME) || true
    docker rmi $(IMAGE) || true

tag:
    @echo "当前版本标签: $(VERSION)"
