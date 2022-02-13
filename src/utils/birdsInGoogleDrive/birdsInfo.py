#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import os.path, re, json, sys

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError


# In[ ]:


# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly']


# In[ ]:


"""Shows basic usage of the Drive v3 API.
Prints the names and ids of the first 10 files the user has access to.
"""
creds = None
# The file token.json stores the user's access and refresh tokens, and is
# created automatically when the authorization flow completes for the first
# time.
if os.path.exists('token.json'):
    creds = Credentials.from_authorized_user_file('token.json', SCOPES)
# If there are no (valid) credentials available, let the user log in.
if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    else:
        flow = InstalledAppFlow.from_client_secrets_file(
            'credentials.json', SCOPES)
        creds = flow.run_local_server(port=0)
    # Save the credentials for the next run
    with open('token.json', 'w') as token:
        token.write(creds.to_json())

service = build('drive', 'v3', credentials=creds)
# Call the Drive v3 API
resource = service.files()


# ## 取得資料夾的所有直接子資料

# In[ ]:


def getItemsInFolder(resource, fields, folderID):
    results = resource.list(fields="files("+fields+")", q="'"+folderID+"' in parents").execute()
    items = results.get('files', [])
    return items


# ## 收集資料夾的所有階層照片

# In[ ]:


def collectInfosUnderFolder(resource, folderID, birdInfos):
    items = getItemsInFolder(resource, "id, name, mimeType", folderID)
    for item in items: # 對於每個檔案
        mimeType = item['mimeType']
        if 'image' in mimeType: # 若為相片檔
            birdInfos.append({
                "id": item['id'],
                "name": item['name']
            })
        elif 'audio' in mimeType: # 若為音檔
            birdInfos.append({
                "id": item['id'],
                "name": item['name']
            })
        elif 'folder' in mimeType: # 若為資料夾
            collectInfosUnderFolder(resource, item['id'], birdInfos) # 繼續尋找底下的照片


# In[ ]:


try:
    # 鳥照資料夾的所有照片
    birdFolderID = "1IrKOaV4fKzr2qG5uuxau0lHBgUi89LV_" # 鳥照資料夾 ID
    birdFolders = getItemsInFolder(resource, "id, name", birdFolderID) # 所有賞鳥資料夾
    birdPhotosInfo = []
    for birdFolder in birdFolders: # 對於每個賞鳥資料夾
        birdPhotoInfo = {}
        names = re.split('[\[\]]', birdFolder['name']); # [[日期], [地點], [鳥種]]
        birdPhotoInfo['date'] = names[0]
        birdPhotoInfo['location'] = names[1]
        
        birdPhotos = []
        collectInfosUnderFolder(resource, birdFolder['id'], birdPhotos)
        birdPhotoInfo['images'] = birdPhotos
        
        birdPhotosInfo.append(birdPhotoInfo)
except HttpError as error:
    # TODO(developer) - Handle errors from drive API.
    print(f'An error occurred: {error}')


# In[ ]:


try:
    # 鳥音資料夾的所有音檔
    birdFolderID = "1Z3aKqPNhY1l-tgKR3h_STmZMyzp_4YQW" # 鳥音資料夾 ID
    birdFolders = getItemsInFolder(resource, "id, name, mimeType", birdFolderID) # 所有賞鳥資料夾
    birdFolders = [item for item in birdFolders if 'folder' in item["mimeType"] and '-' not in item['name']]
    birdRecordsInfo = []
    for birdFolder in birdFolders: # 對於每個賞鳥資料夾
        birdRecordInfo = {}
        birdRecordInfo['bird'] = birdFolder['name']
        
        birdRecords = []
        collectInfosUnderFolder(resource, birdFolder['id'], birdRecords)
        birdRecordInfo['records'] = birdRecords
        
        birdRecordsInfo.append(birdRecordInfo)
except HttpError as error:
    # TODO(developer) - Handle errors from drive API.
    print(f'An error occurred: {error}')


# ## 儲存成 JSON 檔

# In[ ]:


with open('birdPhotosInfo.json', 'w', encoding="utf-8") as f:
    json.dump(birdPhotosInfo, f, ensure_ascii=False, indent=4)


# In[ ]:


with open('birdRecordsInfo.json', 'w', encoding="utf-8") as f:
    json.dump(birdRecordsInfo, f, ensure_ascii=False, indent=4)


# In[ ]:


sys.exit('"birdPhotosInfo" & "birdRecordsInfo" has already been exported!')

