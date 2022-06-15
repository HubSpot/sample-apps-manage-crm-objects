<?php

namespace Helpers;

use HubSpot\Discovery\Discovery;
use HubSpot\Factory;

class HubspotClientHelper
{
    public static function createFactory(): Discovery
    {
        if (!empty($_ENV['ACCESS_TOKEN'])) {
            return Factory::createWithAccessToken($_ENV['ACCESS_TOKEN']);
        }

        throw new \Exception('Please specify ACCESS_TOKEN in .env.');
    }
}
