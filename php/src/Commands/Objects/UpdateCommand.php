<?php

namespace Commands\Objects;

use Helpers\HubspotClientHelper;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class UpdateCommand extends ObjectsCommand
{
    protected static $defaultName = 'objects:update';

    protected function configure()
    {
        parent::configure();

        $this->setDescription('Update an object.');

        $this->addIdToCommand();

        $this->addPropertiesToCommand();
    }

    protected function execute(
        InputInterface $input,
        OutputInterface $output
    ): int {
        $io = new SymfonyStyle($input, $output);
        $hubspot = HubspotClientHelper::createFactory();
        $objectId = $input->getArgument('id');

        $objectType = $this->getObjectType($input);
        $properties = $this->getProperties($input->getArgument('properties'));

        $io->writeln("Updating an object with id: {$objectId}");

        $objectName = '\HubSpot\Client\Crm\\'.ucfirst($objectType).'\Model\SimplePublicObjectInput';
        $object = new $objectName();

        $object->setProperties($properties);

        $response = $hubspot->crm()->{$objectType}()->basicApi()->update($objectId, $object);

        $io->info($response);

        return ObjectsCommand::SUCCESS;
    }
}
