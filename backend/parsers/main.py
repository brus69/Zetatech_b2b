from selenium import webdriver
import time
from bs4 import BeautifulSoup

driver = webdriver.Chrome()

pages = 15
page = 1

while page < pages:
  driver.get('https://2gis.ru/samara/search/%D0%9A%D1%80%D0%B0%D1%81%D0%BE%D1%82%D0%B0')
  time.sleep(2)

  html = driver.page_source

  soup = BeautifulSoup(html, 'html.parser')


  elements = soup.select('#root > div > div > div > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div > div > div > div._z72pvu > div > div > div > div > div:nth-child(2) > div > div')


  for element in elements:
    print(element.select('div > div > div > a > span > span')[0].text)