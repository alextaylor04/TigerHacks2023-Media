import re

def top_50_occurences(lyrics):
    lyrics = ' '.join(lyrics.lower().splitlines())
    words = re.findall(r'\w+', lyrics)

    count = recursive_count(words, {})
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



