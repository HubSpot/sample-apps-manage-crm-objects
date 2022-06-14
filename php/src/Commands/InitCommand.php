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

    protected function configure()
    {
        $this->setDescription('Configure ".env" file.');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        if (!file_exists($this->envFileName)) {
            copy($this->envFileName.'.template', $this->envFileName);
        } elseif (!$io->confirm('The file ".env" already exists. Overwrite?')) {
            return Command::SUCCESS;
        }

        $accessToken = $this->askForAccessToken($io);

        $content = preg_replace(
            '/^ACCESS_TOKEN=.*$/m',
            'ACCESS_TOKEN='.$accessToken,
            file_get_contents($this->envFileName)
        );

        file_put_contents($this->envFileName, $content);

        $io->writeln('Access token was put to ".env" successfully.');

        return Command::SUCCESS;
    }

    protected function askForAccessToken(SymfonyStyle $io): string
    {
        return $io->ask(
            'Enter an access token for your account (found at https://app.hubspot.com/l/private-apps)',
            null,
            function ($key) {
                if (empty($key)) {
                    throw new \RuntimeException('Access token can\'t be empty.');
                }

                return $key;
            }
        );
    }
}
