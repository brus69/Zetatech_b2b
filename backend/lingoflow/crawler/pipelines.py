# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter

from sqlalchemy import create_engine, Column, Integer, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session

Base = declarative_base()

class Post(Base):

    __tablename__ = 'lingflow_scrapy'

    id = Column(Integer, primary_key=True)
    title = Column(Text)
    description = Column(Text)
    h1 = Column(Text)
    content = Column(Text)

class PostToDBPiplene:
    
    def open_spider(self, spider):
        engine = create_engine('sqlite:///sqlite.db')
        Base.metadata.create_all(engine)
        self.session = Session(engine)
    
    def process_item(self, item, spider):
        post = Post(
          title = item['title'],
          description = item['description'],
          h1 = item['h1'],
          content = item['content'],  
        )
        self.session.add(post)
        self.session.commit()
        return item

    def close_spider(self, spider):
        self.session.close()