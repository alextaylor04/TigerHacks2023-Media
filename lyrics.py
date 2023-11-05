import re
import operator
import collections
from lyricsgenius import Genius

API_TOKEN = open("LYRICS_API_TOKEN", "r").read()
genius = Genius(API_TOKEN)

# Turn off status messages
genius.verbose = False

# Remove section headers (e.g. [Chorus]) from lyrics when searching
genius.remove_section_headers = True

def top_50_occurences(lyrics):
    lyrics = ' '.join(lyrics.lower().splitlines())
    words = re.findall(r'\w+', lyrics)

    count = recursive_count(words, {})
    count = collections.OrderedDict(sorted(count.items(),  key=operator.itemgetter(1), reverse=True))

    exclusions_f = open("excluded_words", "r")
    for exclusion in exclusions_f:
        if not exclusion.strip() in count:
            continue
        del count[exclusion.strip()]
    while len(count) > 50:
        count.popitem()
    return count
        

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

def lyrics_string(track_author):
    song = genius.search_song(track_author)
    return song.lyrics

class LyricsSearchInstance:
    static_num_searches = -1
    def __init__(self, max_search):
        LyricsSearchInstance.static_num_searches += 1
        if LyricsSearchInstance.static_num_searches == max_search:
            LyricsSearchInstance.static_num_searches = 0
        self.num_searches = LyricsSearchInstance.static_num_searches

