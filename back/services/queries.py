# pip3 install pymongo
# pip install dnspython

import pymongo

def RetrieveGames(user: str, maxGame: int) -> bool:
   client = pymongo.MongoClient(
      'url')
   try:
      database = client["woodpecker-db"]
      collection = database["games"]
      for currentGame in collection.find({"user": user}).limit(maxGame):
         if currentGame["analyzed"] == True:
            print(currentGame["game_id"])
            print("Already analyzed")
         else:
            print(currentGame["game_id"])
            print("Not analyzed yet")
            # Proceed to analyzis
            # updateGame analyzis to true
            # If a puzzle is found from the game -> insertPuzzle  
      return True
   except Exception as err:
      print(err)
      return False
   
def updateGame(gameToUpdate) -> bool:
   client = pymongo.MongoClient(
      'url')
   try:
      database = client["woodpecker-db"]
      collection = database["games"]
      setAsAnalyzed = { "$set" : { "analyzed": True }}
      collection.update_one(gameToUpdate, setAsAnalyzed)
      return True
   except Exception as err:
      print(err)
      return False

def insertPuzzle(puzzle) -> bool:
   client = pymongo.MongoClient('url')
   try:
      database = client["woodpecker-db"]
      collection = database["puzzles"]
      collection.insert_one(puzzle)
      return True
   except Exception as err:
      print(err)
      return False

RetrieveGames("detnop", 4)