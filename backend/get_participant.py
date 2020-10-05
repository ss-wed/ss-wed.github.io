from flask import Flask, request
from flask_cors import CORS
import os
from google.cloud import firestore
import csv
import json

app = Flask(__name__)

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = 'C:/Users/ikeda/Documents/project/wedding/backend/gcpkey/wedding-system-244912-579ef9035123.json'

participant = {doc.id: doc.to_dict() for doc in firestore.Client().collection('participant').stream()}
print(participant)
# participant = [dict({'name': key}, **val) for key, val in participant.items()]

# def split_companion(d):
#     if not d['companion_list']:
#         return [d]

#     new_comps = [comp for comp in d['companion_list']]
#     d['companion_list'] = []
#     return [d] + new_comps

# new_participant = []
# for p in participant:
#     new_participant += split_companion(p)

with open("file.csv","wb") as f:
    json.dump(participant, f, indent=4)

# header = new_participant[0].keys()
# with open("file.csv","wb") as f:
#     writer = csv.DictWriter(f, header)
#     header_row = {"k":k for k in header}

#     for row in new_participant:
#         writer.writerow(row)
