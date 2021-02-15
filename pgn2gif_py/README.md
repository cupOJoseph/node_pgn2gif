# pgn2gif
Generate gifs from pgn files of your chess games.

## Bulk Conversions
Use `expand-games.py` to expand the bulk pgn files into pgn files that have just 1 game per file. Then use `convert.py` (which is an example of using the underlying library created originally by @dn1z) to convert the bulk single game files to gifs, with associated json info.

## Installation
* You need [python 3.5](https://www.python.org/downloads/) or newer installed.
* Clone the repo with `git clone https://github.com/dn1z/pgn2gif`.
* In the cloned directory run
```
pip install -r requirements.txt
```
* If you want to install system wide
```
python setup.py install
```

## Usage
Run pgn2gif with the following options:
```
usage: pgn2gif [-h] [-d DURATION] [-o OUT] [-r] [--black-square-color BLACK_SQUARE_COLOR] [--white-square-color WHITE_SQUARE_COLOR] [path [path ...]]

positional arguments:
  path                  Path to the pgn file(s)

optional arguments:
  -h, --help            show this help message and exit
  -d DURATION, --duration DURATION
                        Duration between moves in seconds
  -o OUT, --out OUT     Name of the output folder
  -r, --reverse         Reverse board
  --black-square-color BLACK_SQUARE_COLOR
                        Color of black squares in hex
  --white-square-color WHITE_SQUARE_COLOR
                        Color of white squares in hex
```
Also can be used as a library
```python
import pgn2gif

creator = pgn2gif.PgnToGifCreator(reverse=True, duration=0.1, ws_color='white', bs_color='gray')
creator.create_gif("first.pgn") # creates first.gif
creator.create_gif("second.pgn", out_path="../chess.gif")
```

## Example

### PGN
```
1. Nf3 Nf6 2. d4 e6 3. c4 b6 4. g3 Bb7 5. Bg2 Be7 6. O-O O-O
7. d5 exd5 8. Nh4 c6 9. cxd5 Nxd5 10. Nf5 Nc7 11. e4 d5
12. exd5 Nxd5 13. Nc3 Nxc3 14. Qg4 g6 15. Nh6+ Kg7 16. bxc3
Bc8 17. Qf4 Qd6 18. Qa4 g5 19. Re1 Kxh6 20. h4 f6 21. Be3 Bf5
22. Rad1 Qa3 23. Qc4 b5 24. hxg5+ fxg5 25. Qh4+ Kg6 26. Qh1
Kg7 27. Be4 Bg6 28. Bxg6 hxg6 29. Qh3 Bf6 30. Kg2 Qxa2 31. Rh1
Qg8 32. c4 Re8 33. Bd4 Bxd4 34. Rxd4 Rd8 35. Rxd8 Qxd8 36. Qe6
Nd7 37. Rd1 Nc5 38. Rxd8 Nxe6 39. Rxa8 Kf6 40. cxb5 cxb5
41. Kf3 Nd4+ 42. Ke4 Nc6 43. Rc8 Ne7 44. Rb8 Nf5 45. g4 Nh6
46. f3 Nf7 47. Ra8 Nd6+ 48. Kd5 Nc4 49. Rxa7 Ne3+ 50. Ke4 Nc4
51. Ra6+ Kg7 52. Rc6 Kf7 53. Rc5 Ke6 54. Rxg5 Kf6 55. Rc5 g5
56. Kd4 1-0
```

### GIF output
<img src="https://media2.giphy.com/media/Pwl1k2pTJmR5zyGjs0/giphy.gif">

## License
Copyright (c) M. Deniz Kızılırmak. All rights reserved.

Licensed under the MIT license.
