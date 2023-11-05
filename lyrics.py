import re
import operator
import collections
from lyricsgenius import Genius

API_TOKEN = open("LYRICS_API_TOKEN", "r").read()
genius = Genius(API_TOKEN)

def top_50_occurences(lyrics):
    lyrics = ' '.join(lyrics.lower().splitlines())
    words = re.findall(r'\w+', lyrics)

    count = recursive_count(words, {})
    count = collections.OrderedDict(sorted(count.items(),  key=operator.itemgetter(1)))
    print(count)

def recursive_count(words, word_frequencies):
    if len(words) == 0:
        return word_frequencies
    word_frequencies[words[0]] = words.count(words[0])
    words = remove_items(words, words[0])
    return recursive_count(words, word_frequencies)

def remove_items(test_list, item): 
  
    # using list comprehension to perform the task 
    res = [i for i in test_list if i != item] 
    return res 

def lyrics_string(tracks_author_dict):
    lyrics_str = ""
    for x, y in tracks_author_dict:
        lyrics_string += genius.search_song(x,y)

