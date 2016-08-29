#!/bin/bash


# trigger a docker image build on docker hub
curl \
  -H "Content-Type: application/json" \
  --data '{"build": true}' \
  -X POST https://registry.hub.docker.com/u/qutseamless/api/trigger/2e35cc21-7595-485f-8133-4f2933a87e8c/
