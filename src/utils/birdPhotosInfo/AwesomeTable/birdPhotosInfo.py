#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import pandas as pd, json, os


# In[ ]:


# 讀取檔案
df = pd.read_csv("C:/Users/ressa/ReactHooks/bird-watching/src/utils/birdPhotosInfo.csv", encoding='utf8')


# In[ ]:


# 所有資料
metadata = []
# 對每一列
for row in df.itertuples():
    # 該列所需資料`
    piece = {
        "id": row[2],
        "date": row[6]
    }
    # 儲存
    metadata.append(piece)
metadata = metadata[1::]


# In[ ]:


with open('C:/Users/ressa/ReactHooks/bird-watching/src/utils/birdPhotosInfo.json', 'w', encoding="utf-8") as f:
    json.dump(metadata, f, ensure_ascii=False, indent=4)


# In[ ]:


os.remove("C:/Users/ressa/ReactHooks/bird-watching/src/utils/birdPhotosInfo.csv")


# In[ ]:


sys.exit('"birdPhotosInfo" has already been exported!')

