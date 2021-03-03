#!/usr/bin/env php
<?php

require __DIR__.'/../vendor/autoload.php';

use Commands\InitCommand;
use Commands\Objects\CreateCommand;
use Commands\Objects\GetCommand;
use Symfony\Component\Console\Application;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__.'/../');
$dotenv->load();

$application = new Application();

$application->add(new GetCommand());
$application->add(new CreateCommand());
$application->add(new InitCommand());

$application->run();
