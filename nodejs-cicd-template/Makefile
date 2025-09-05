VERSION_BASE = v2.0.1
DATE_TAG = $(shell date +%Y%m%d)
VERSION = $(VERSION_BASE)-$(DATE_TAG)
IMAGE = yanyuit/mcp-server:$(VERSION)

build:
	docker buildx build --platform linux/amd64 -t $(IMAGE) --load .

push:
	docker buildx build --platform linux/amd64 -t $(IMAGE) --push .

tag:
	@echo "当前版本标签: $(VERSION)"
