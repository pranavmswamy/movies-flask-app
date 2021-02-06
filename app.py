from flask import Flask, request, render_template, url_for, jsonify
import requests

TMDB_API_KEY = "97588ddc4a26e3091152aa0c9a40de22"

application = Flask(__name__)

@application.route('/', methods= ['GET'])
def home():   
    return application.send_static_file("hw3.html")

# trending movies
@application.route('/movies/get-trending-week', methods = ['GET'])
def getTrendingMovies():
    """
    Method that returns the JSON of trending movies in the last week.
    """

    # constructing the url
    url = "https://api.themoviedb.org/3/trending/movie/week?"
    url += f"api_key={ TMDB_API_KEY }"
    
    requestResponse = requests.get(url)

    return requestResponse.json()


# upcoming movies
@application.route('/movies/get-upcoming', methods = ['GET'])
def getUpcomingMovies():
    """
    Method that returns the upcoming movies for the next month.
    """

    url = "https://api.themoviedb.org/3/movie/upcoming?"
    url += f"api_key={TMDB_API_KEY}" + "&language=en-US&page=1"

    requestResponse = requests.get(url)

    return requestResponse.json()



if __name__ == '__main__':
    application.run(port=5003)