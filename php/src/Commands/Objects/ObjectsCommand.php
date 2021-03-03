<?php

namespace Commands\Objects;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;

class ObjectsCommand extends Command
{
    protected $allowedObjectsTypes = [
        'companies',
        'contacts',
        'deals',
        'lineItems',
        'products',
        'quotes',
        'tickets',
    ];

    protected function configure()
    {
        $this->addArgument(
            'objectType',
            InputArgument::REQUIRED,
            'Enter object type ('.implode('|', $this->allowedObjectsTypes).')'
        );
    }

    protected function getObjectType(InputInterface $input): string
    {
        $objectType = $input->getArgument('objectType');

        if (!in_array($objectType, $this->allowedObjectsTypes)) {
            throw new \RuntimeException('Invalid Object Type. ('.implode('|', $this->allowedObjectsTypes).')');
        }

        return $objectType;
    }
    
    protected function addPropertiesToCommand()
    {
        $this
            ->addArgument(
                'properties',
                InputArgument::IS_ARRAY | InputArgument::REQUIRED,
                'Enter Properties (separate multiple names with a space).'
            )
        ;
    }
    
    protected function getProperties(array $elements): array
    {
        $properties = [];
        foreach ($elements as $element) {
            $array = explode('=', $element);
            if (count($array) != 2) {
                throw new \RuntimeException('Invalid Element "'.$element.'".');
            } else {
                $properties[$array[0]] = $array[1];
            }
        }
        
        return $properties;
    }
}
