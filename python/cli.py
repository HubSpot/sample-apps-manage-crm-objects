import os
import argparse
import json
from dotenv import load_dotenv
from hubspot import HubSpot
from hubspot.crm.objects.models import SimplePublicObjectInput

def access_token():
  load_dotenv()
  return os.environ['ACCESS_TOKEN']

parser = argparse.ArgumentParser(description='Parse Hubspot API arguments')
parser.add_argument('-m', '--method', help='Method to run')
parser.add_argument('-t', '--object_type', help='Object type')
parser.add_argument('-i', '--object_id', help='Object id')
parser.add_argument('-p', '--properties', help='Properties of object')
parser.add_argument('-k', '--kwargs', help='kwargs to pass')
args = parser.parse_args()

if (args.method is None):
  raise Exception('Please, provide method with -m or --method. See --help to get more info.')

api_client = HubSpot(access_token=access_token())
api = api_client.crm.objects.basic_api

kwargs = vars(args)
filtered_kwargs = dict((k, v) for k, v in kwargs.items() if v is not None and k != 'method' and k != 'properties')
if (args.properties is not None):
  properties = json.loads(args.properties)
  filtered_kwargs['simple_public_object_input'] = SimplePublicObjectInput(properties=properties)

result = getattr(api, args.method)(**filtered_kwargs)
print(result)
