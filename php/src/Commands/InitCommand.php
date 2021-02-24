<?php

namespace Commands;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class InitCommand extends Command
{
    protected static $defaultName = 'app:init';

    protected $envFileName = __DIR__.'/../../.env';

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $io = new SymfonyStyle($input, $output);

        if (!file_exists($this->envFileName)) {
            copy($this->envFileName.'.template', $this->envFileName);
        } elseif (!$io->confirm('The file ".env" already exists. Overwrite?')) {
            return Command::SUCCESS;
        }

        $apiKey = $this->askForApiKey($io);

        $content = preg_replace(
            '/^HUBSPOT_API_KEY=.*$/m',
            'HUBSPOT_API_KEY='.$apiKey,
            file_get_contents($this->envFileName)
        );

        file_put_contents($this->envFileName, $content);

        $io->writeln('API key was put to ".env" successfully.');

        return Command::SUCCESS;
    }

    protected function askForApiKey(SymfonyStyle $io): string
    {
        return $io->ask(
            'Enter the API key for your account (found at https://app.hubspot.com/l/api-key)',
            null,
            function ($key) {
                if (empty($key)) {
                    throw new \RuntimeException('Key can\'t be empty.');
                }

                return $key;
            }
        );
    }
}
