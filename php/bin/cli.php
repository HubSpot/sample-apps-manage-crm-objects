#!/usr/bin/env php
<?php

require __DIR__.'/../vendor/autoload.php';

use Commands\InitCommand;
use Symfony\Component\Console\Application;

$application = new Application();

$application->add(new InitCommand());

$application->run();
