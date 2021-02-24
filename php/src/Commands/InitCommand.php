<?php
namespace Commands;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class InitCommand extends Command {
    protected static $defaultName = 'app:init';
    
    protected $envFileName = __DIR__ . '/../../.env';

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $io = new SymfonyStyle($input, $output);
        
        if (file_exists($this->envFileName) && !$io->confirm('The file ".env" already exists. Overwrite?')) {
            return Command::SUCCESS;
        }
        
        $this->askForApiKey($io);
        
        return Command::SUCCESS;
    }
    
    protected function askForApiKey(SymfonyStyle $io)
    {
        $apiKey = $io->ask(
            'Enter the API key for your account (found at https://app.hubspot.com/l/api-key)',
            null,
            function ($key) {
                if (empty($key)) {
                    throw new \RuntimeException('Key can\'t be empty.');
                }

                return $key;
            }
        );

        file_put_contents($this->envFileName, 'HUBSPOT_API_KEY=' . $apiKey . PHP_EOL);
    }
}
