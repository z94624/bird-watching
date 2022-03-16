#!/usr/bin/env python
# coding: utf-8

# In[ ]:


from bs4 import BeautifulSoup as bs
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import time
import datetime
import json


# In[ ]:


def browseVideosInPlayList(startingVid):
    playlistURL = "https://www.youtube.com/watch?v={}&list=PLTks92J980S2Dbx2WaSDAT1h35vzb7iMU&ab_channel=smoBEEBirdiverse".format(startingVid)
    driver = webdriver.Chrome(ChromeDriverManager().install())
    driver.get(playlistURL)
    time.sleep(2)
    
    html = driver.page_source
    time.sleep(2)
    driver.close()
    
    soup = bs(html, 'html.parser')
    
    allVids = [a.get('href').split('v=')[1].split('&')[0] for a in soup.find_all("a", class_="ytd-playlist-panel-video-renderer")]
    allSpans = [span.text for span in soup.find_all("span", class_="ytd-playlist-panel-video-renderer")]
    allTitles = [span[11:-9] for span in allSpans if ' / ' in span]
    
    global vids, dates, locations, birds
    firstVid = allVids[0]
    if firstVid != startingVid:
        newVids = [vid for vid in allVids if vid not in vids]
        vids = newVids + vids
        
        newTitles = allTitles[:len(newVids)]
        dates = [title.split(' / ')[0] for title in newTitles] + dates
        locations = [title.split(' / ')[1] for title in newTitles] + locations
        birds = [title.split(' / ')[2].split(' (')[0].split('（')[0].split(' #')[0] for title in newTitles] + birds
        
        browseVideosInPlayList(firstVid)


# In[ ]:


vids, dates, locations, birds = [], [], [], []
browseVideosInPlayList("F-HQYa59hk8")


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

