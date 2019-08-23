#!/bin/bash
dockerc=docker-compose
$dockerc -f docker-compose-test.yml down --remove-orphans &&
  $dockerc -f docker-compose-test.yml build &&
  $dockerc -f docker-compose-test.yml up -d ganachecli redis &&
  $dockerc -f docker-compose-test.yml up -d test-gambling-manager &&
  $dockerc -f docker-compose-test.yml up -d processor
