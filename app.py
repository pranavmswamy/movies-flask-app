from flask import Flask, request, render_template, url_for, jsonify
import requests

TMDB_API_KEY = "97588ddc4a26e3091152aa0c9a40de22"
movie_genres_dict = dict()
tv_genres_dict = dict()

application = Flask(__name__)

@application.route('/', methods= ['GET'])
def home():   
    return application.send_static_file("hw3.html")

# HOME PAGE - trending movies this week
@application.route('/movies/get-trending-week', methods = ['GET'])
def getTrendingMovies():
    """
    Method that returns the JSON of trending movies in the last week.
    """

    # constructing the url
    url = "https://api.themoviedb.org/3/trending/movie/week?"
    url += f"api_key={ TMDB_API_KEY }"
    
    requestResponse = requests.get(url)
    responseDict = requestResponse.json()

    customResponse = {"trending_movies": list()}
    LIMIT = 0
    for movieDict in responseDict['results']:
        customResponse['trending_movies'].append({
            "backdrop_path": "https://image.tmdb.org/t/p/w780" + movieDict["backdrop_path"],
            "genres": ", ".join([movie_genres_dict[num] for num in movieDict['genre_ids']]),
            "title": movieDict['title'],
            "overview": movieDict['overview'],
            "release_date": movieDict["release_date"],
            "vote_average": calculate_stars(movieDict["vote_average"]),
            "vote_count": movieDict["vote_count"]
        })
        LIMIT += 1
        if LIMIT == 5:
            break

    return customResponse


# HOME PAGE - TV Airing Today
@application.route('/tv/airing-today', methods = ['GET'])
def getTVOnAirToday():
    """
    Method that returns shows on TV on air today.
    """

    url = "https://api.themoviedb.org/3/tv/airing_today?" + f"api_key={TMDB_API_KEY}&language=en-US&page=1"
    requestResponse = requests.get(url)
    responseDict = requestResponse.json()

    customResponse = {"tv_airing_today": list()}
    LIMIT = 0
    for tvDict in responseDict['results']:
        customResponse['tv_airing_today'].append({
            "backdrop_path": "https://image.tmdb.org/t/p/w780" + tvDict["backdrop_path"],
            "genres": ", ".join([tv_genres_dict[num] for num in tvDict['genre_ids']]),
            "name": tvDict['name'],
            "overview": tvDict['overview'],
            "first_air_date": tvDict["first_air_date"],
            "vote_average": calculate_stars(tvDict["vote_average"]),
            "vote_count": tvDict["vote_count"]
        })
        LIMIT += 1
        if LIMIT == 5:
            break

    return customResponse

    return requestResponse.json()



# HELPER FUNCTIONS
def populate_genres_dict():
    # constructing the url
    global movie_genres_dict
    global tv_genres_dict

    url = "https://api.themoviedb.org/3/genre/movie/list?" + f"api_key={TMDB_API_KEY}&language=en-US"
    requestResponse = requests.get(url)
    responseDict = requestResponse.json()
    movie_genres_dict = { genre['id'] : genre['name'] for genre in responseDict['genres'] }
    
    url = "https://api.themoviedb.org/3/genre/tv/list?" + f"api_key={TMDB_API_KEY}&language=en-US"
    requestResponse = requests.get(url)
    responseDict = requestResponse.json()
    tv_genres_dict = { genre['id']: genre['name'] for genre in responseDict['genres']}

def calculate_stars(rating):
    scaled_down_rating = float(rating) / 2
    return str(scaled_down_rating) 

if __name__ == '__main__':
    populate_genres_dict()
    application.run(port=5003)