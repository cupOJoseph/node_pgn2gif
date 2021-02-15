import pgn2gif
import sys

creator = pgn2gif.PgnToGifCreator(reverse=True, duration=0.4, ws_color='#4a5415', bs_color='gray')
creator.create_gif("../games/game.pgn", out_path="../views/game.gif")
print("I made a gif!")
sys.stdout.flush()