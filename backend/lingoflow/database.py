"""
Модуль для взаимодействия с базой данных, 
где вы будете хранить переведенные статьи
"""
from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.orm import declarative_base
Base = declarative_base()

class TranslatedText(Base):
    __tablename__ = 'translated_texts'

    id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(String)
    h1 = Column(String)
    content = Column(Text)

