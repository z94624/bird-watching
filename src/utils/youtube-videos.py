#!/usr/bin/env python
# coding: utf-8

# In[ ]:


from bs4 import BeautifulSoup as bs
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import time
import datetime
import json
import sys


# In[ ]:


playlistURL = "https://www.youtube.com/watch?v=VwabEKgX94s&list=PLTks92J980S2Dbx2WaSDAT1h35vzb7iMU&ab_channel=smoBEEUniverse"
driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get(playlistURL)
time.sleep(2)


# In[ ]:


html = driver.page_source
time.sleep(2)
driver.close()


# In[ ]:


soup = bs(html, 'html.parser')


# In[ ]:


vids = [a.get('href').split('v=')[1].split('&')[0] for a in soup.find_all("a", class_="ytd-playlist-panel-video-renderer")]


# In[ ]:


spans = [span.text for span in soup.find_all("span", class_="ytd-playlist-panel-video-renderer")]
titles = [span[11:-9] for span in spans if ' / ' in span]
dates = [title.split(' / ')[0] for title in titles]
locations = [title.split(' / ')[1] for title in titles]
birds = [title.split(' / ')[2].split(' (')[0].split('（')[0].split(' #')[0] for title in titles]


# In[ ]:


videos = []
for (date, location, bird, vid) in zip(dates, locations, birds, vids):
    year = int(date[0:4])
    month = int(date[4:6])
    day = int(date[6:8])
    
    video = {
        "date": datetime.date(year, month, day).isoformat(),
        "location": location,
        "bird": bird,
        "vid": vid
    }
    videos.append(video)


# In[ ]:


with open('C:/Users/ressa/ReactHooks/bird-watching/src/utils/youtube-videos.json', 'w', encoding="utf-8") as f:
    json.dump(videos, f, ensure_ascii=False, indent=4)


# In[ ]:


sys.exit('"youtube-videos.json" has already been exported!')

