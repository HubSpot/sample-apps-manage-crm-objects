<?php
namespace Commands;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class InitCommand extends Command {
    protected static $defaultName = 'app:init';
    
    protected $fileName = __DIR__.'/../../.env';

    protected function configure()
    {
        
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $io = new SymfonyStyle($input, $output);
        if (file_exists($this->fileName) && !$io->confirm('The file ".env" already exists. Overwrite?')) {
            return Command::SUCCESS;
        }
        
        $this->askApiKey($io);
        
        return Command::SUCCESS;
    }
    
    protected function askApiKey(SymfonyStyle $io) {
        
        $apiKeyRegex = '/^([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})$/i';

        $apiKey = $io->ask(
            'Enter the API key for your account (found at https://app.hubspot.com/l/api-key)',
            null,
            function ($key) use ($apiKeyRegex) {
                if (empty($key)) {
                    throw new \RuntimeException('Key can\'t be empty.');
                }

                if (preg_match($apiKeyRegex, $key) != 1) {
                    throw new \RuntimeException('Incorect API key.');
                }

                return $key;
            }
        );

        file_put_contents($this->fileName, 'HUBSPOT_API_KEY='.$apiKey.PHP_EOL);
    }
}
