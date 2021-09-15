#!/usr/bin/env python
# coding: utf-8

# In[ ]:


from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup as bs
import time, requests, zipfile, io, pandas as pd, numpy as np, json, os


# # eBird 登入資訊

# In[ ]:


account = input("eBird 帳號：")
password = input("eBird 密碼：")


# # 登入 eBird

# In[ ]:


driver = webdriver.Chrome(ChromeDriverManager().install())
# 連到登入網址
driver.get("https://secure.birds.cornell.edu/cassso/login?service=https%3A%2F%2Febird.org%2Flogin%2Fcas%3Fportal%3Debird&locale=zh")
driver.find_element_by_id("input-user-name").clear()
# 輸入帳號
driver.find_element_by_id("input-user-name").send_keys(account)
driver.find_element_by_id("input-password").clear()
# 輸入密碼
driver.find_element_by_id("input-password").send_keys(password)
# 登入
driver.find_element_by_id("form-submit").click()


# # eBird "下載我的資料" 檔名

# In[ ]:


# 連到下載檔案網址
driver.get("https://ebird.org/ebird/download")
# 取得下載檔案頁面
html = driver.page_source
time.sleep(2)
driver.close()


# # eBird "下載我的資料" 連結

# In[ ]:


soup = bs(html, 'html.parser')
# 檔案名稱
dataID = soup.find("body").contents[0]
# 檔案連結
dataURL = "https://mydata.ebird.org/downloads/" + dataID


# # 下載並解壓縮取得 CSV 檔案

# In[ ]:


time.sleep(30)
# 請求檔案
response = requests.get(dataURL)
# 下載壓縮檔
zipFile = zipfile.ZipFile(io.BytesIO(response.content))
# 解壓縮檔案
zipFile.extractall("C:/Users/ressa/ReactHooks/bird-watching/src/utils")


# # 讀取表格

# In[ ]:


# 讀取檔案
df = pd.read_csv("C:/Users/ressa/ReactHooks/bird-watching/src/utils/MyEBirdData.csv", encoding='utf8')
# NaN 資料全部轉為空字串
df_nan = df.replace(np.nan, '', regex=True)


# # 表格轉換為 JSON 格式資料

# In[ ]:


# 所有資料
metadata = []
# 對每一列
for row in df_nan.itertuples():
    # 該列所需資料
    piece = {
        "Submission_ID": [row[1]],
        "Common_Name": [row[2]],
        "Count": [row[5]],
        "State/Province": [row[6]],
        "County": [row[7]],
        "Location": [row[9]],
        "Latitude": [row[10]],
        "Longitude": [row[11]],
        "Date": [row[12]],
        "Time": [row[13]],
        "Protocol": [row[14]],
        "Duration(Min)": [row[15]],
        "Number_of_Observers": [row[19]],
        "Breeding_Code": [row[20]],
        "Observation_Details": [row[21]]
    }
    # 儲存
    metadata.append(piece)


# # 儲存為 JSON 檔案

# In[ ]:


with open('C:/Users/ressa/ReactHooks/bird-watching/src/utils/ebird-metadata_{}.json'.format(account.replace(" ", "-")), 'w', encoding="utf-8") as f:
    json.dump(metadata, f, ensure_ascii=False, indent=4)


# # 刪除 CSV 檔案

# In[ ]:


os.remove("C:/Users/ressa/ReactHooks/bird-watching/src/utils/MyEBirdData.csv")


# In[ ]:


sys.exit('"ebird-metadata_{}" has already been exported!'.format(account.replace(" ", "-")))

