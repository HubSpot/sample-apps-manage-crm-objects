<?php

namespace Commands\Objects;

use Helpers\HubspotClientHelper;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class CreateCommand extends ObjectsCommand
{
    protected static $defaultName = 'objects:create';

    protected function configure()
    {
        parent::configure();

        $this->setDescription('Create an object.');
        
        $this->addPropertiesToCommand();
    }

    protected function execute(
        InputInterface $input,
        OutputInterface $output
    ): int {
        $io = new SymfonyStyle($input, $output);
        $hubspot = HubspotClientHelper::createFactory();
        
        $objectType = $this->getObjectType($input);
        $properties = $this->getProperties($input->getArgument('properties'));
        
        $io->writeln('Creating an object...');
        
        $objectName = '\HubSpot\Client\Crm\\'.ucfirst($objectType).'\Model\SimplePublicObjectInput';
        $object = new $objectName();
        
        $object->setProperties($properties);

        $response = $hubspot->crm()->{$objectType}()->basicApi()->create($object);

        $io->info($response);
        
        return ObjectsCommand::SUCCESS;
    }
}
