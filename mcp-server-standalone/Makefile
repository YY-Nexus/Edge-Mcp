# Makefile for mcp-server lifecycle
IMAGE_NAME = yanyuit/mcp-server
VERSION = v2
PLATFORM = linux/amd64

build:
	docker buildx build \
		--platform $(PLATFORM) \
		-t $(IMAGE_NAME):$(VERSION) \
		--load .

push:
	docker buildx build \
		--platform $(PLATFORM) \
		-t $(IMAGE_NAME):$(VERSION) \
		--push .

run:
	docker run -d \
		--name mcp-server \
		-p 8080:8080 \
		--restart unless-stopped \
		-v $(PWD)/config.yaml:/app/config.yaml \
		-v $(PWD)/logs:/app/logs \
		$(IMAGE_NAME):$(VERSION)

clean:
	docker rm -f mcp-server || true
	docker rmi $(IMAGE_NAME):$(VERSION) || true
