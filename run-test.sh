#!/bin/bash
dockerc=docker-compose
$dockerc -f docker-compose-test.yml down --remove-orphans &&
  $dockerc -f docker-compose-test.yml build &&
  $dockerc -f docker-compose-test.yml up -d ganachecli redis processor
