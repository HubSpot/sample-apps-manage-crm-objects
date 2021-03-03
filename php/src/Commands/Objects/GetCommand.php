<?php

namespace Commands\Objects;

use Helpers\HubspotClientHelper;
use HubSpot\Discovery\Discovery;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class GetCommand extends ObjectsCommand
{
    protected static $defaultName = 'objects:get';

    protected function configure()
    {
        parent::configure();

        $this->setDescription('Get all objects, an object by Id or search an objects.');

        $this
            ->addOption(
                'all',
                null,
                InputOption::VALUE_NONE,
                'Get all objects.'
            )
        ;

        $this
            ->addOption(
                'id',
                null,
                InputOption::VALUE_REQUIRED,
                'Get object by Id.'
            )
        ;

        $this
            ->addOption(
                'query',
                null,
                InputOption::VALUE_REQUIRED,
                'Search objects by query.'
            )
        ;
    }

    protected function execute(
        InputInterface $input,
        OutputInterface $output
    ): int {
        $io = new SymfonyStyle($input, $output);
        $hubspot = HubspotClientHelper::createFactory();
        $objectType = $this->getObjectType($input);

        if ($input->getOption('all')) {
            $io->writeln('Getting all objects...');
            $objects = $hubspot->crm()->{$objectType}()->getAll();

            $io->listing($objects);
        } elseif (!empty($input->getOption('id'))) {
            $io->writeln('Getting object by id...');
            $object = $hubspot->crm()->{$objectType}()->basicApi()->getById($input->getOption('id'));

            $io->info($object);
        } elseif ($input->getOption('query')) {
            $io->writeln('Searching objects by query...');

            $this->search($input->getOption('query'), $objectType, $hubspot, $io);
        }

        return ObjectsCommand::SUCCESS;
    }

    protected function search(
        string $query,
        string $objectType,
        Discovery $hubspot,
        SymfonyStyle $io
    ): void {
        $after = null;
        $object = '\HubSpot\Client\Crm\\'.ucfirst($objectType).'\Model\PublicObjectSearchRequest';
        $request = new $object(['query' => $query]);
        $request->setLimit(100);

        do {
            $request->setAfter($after);
            $objects = $hubspot->crm()->{$objectType}()->searchApi()->doSearch($request);

            $io->listing($objects->getResults());
            if ($objects->getPaging()) {
                $after = $objects->getPaging()->getNext()->getAfter();
            } else {
                $after = null;
            }
        } while ($after);
    }
}
