#!/usr/bin/env php
<?php

require __DIR__.'/../vendor/autoload.php';

use Commands\GetCommand;
use Commands\InitCommand;
use Symfony\Component\Console\Application;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__.'/../');
$dotenv->load();

$application = new Application();

$application->add(new GetCommand());
$application->add(new InitCommand());

$application->run();
